// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED }

    struct Shipment {
        address sender;
        address receiver;
        address shipper; // Explicitly assigned shipper
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    struct TypeShipment {
        address sender;
        address receiver;
        address shipper; // Added shipper field
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    TypeShipment[] public typeShipments;

    address[] public shipperList; // List of registered shippers
    uint256 public currentShipperIndex = 0; // Round-robin index
    
    
    mapping(address => bool) public isShipperRegistered; // Prevent duplicates

    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price);
    event ShipmentInTransit(address indexed sender, address indexed receiver, address indexed shipper, uint256 pickupTime);
    event ShipmentDelivered(address indexed sender, address indexed receiver, address indexed shipper, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, address indexed shipper, uint256 amount);
    event ShipperRegistered(address indexed shipper);

    constructor() {
        shipmentCount = 0;
    }

    // ✅ **Register a new shipper (Prevents duplicates)**
    function registerShipper() public {
        require(!isShipperRegistered[msg.sender], "Shipper already registered.");
        
        shipperList.push(msg.sender);
        isShipperRegistered[msg.sender] = true;
        
        emit ShipperRegistered(msg.sender);
    }

    // ✅ **Round-Robin Shipper Selection**
    function getNextShipper() internal returns (address) {
        require(shipperList.length > 0, "No registered shippers available.");
        
        address assignedShipper = shipperList[currentShipperIndex];
        currentShipperIndex = (currentShipperIndex + 1) % shipperList.length; // Move to next shipper
        
        return assignedShipper;
    }


    // ✅ **Only sender can create shipment & must send ETH assigns shipper using Round-Robin**
    function createShipment(address _receiver,  uint256 _pickupTime, uint256 _distance, uint256 _price) public payable {
        require(msg.value == _price, "Payment amount must match the price.");
        address assignedShipper = getNextShipper(); // Get next available shipper

        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            assignedShipper, // Assign shipper during creation
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        typeShipments.push(
            TypeShipment(
                msg.sender,
                _receiver,
                assignedShipper,
                _pickupTime,
                0,
                _distance,
                _price,
                ShipmentStatus.PENDING,
                false
            )
        );
        
        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }

    // ✅ **Only the assigned shipper can start the shipment**
    function startShipment(address _sender, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already in transit or delivered.");
        require(msg.sender == shipment.shipper, "Only assigned shipper can start the shipment.");

        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, shipment.receiver, msg.sender, shipment.pickupTime);
    }

    // ✅ **Only receiver can complete shipment and release payment**
    function completeShipment(address _sender, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(msg.sender == shipment.receiver, "Only the receiver can complete the shipment.");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment must be in transit.");
        require(!shipment.isPaid, "Shipment already paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        typeShipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;
        typeShipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;

        // ✅ Payment goes to the shipper
        payable(shipment.shipper).transfer(amount);

        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentDelivered(_sender, msg.sender, shipment.shipper, shipment.deliveryTime);
        emit ShipmentPaid(_sender, msg.sender, shipment.shipper, amount);
    }

    

    function getShipment(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool) {
        Shipment memory shipment = shipments[_sender][_index];
        return (shipment.sender, shipment.receiver, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);
    }

    function getShipmentsCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }

     function getAllTransactions()
        public
        view
        returns (TypeShipment[] memory)
    {
        return typeShipments;
    }

   
}
