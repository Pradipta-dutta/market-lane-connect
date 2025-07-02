
// Mock employees data - 10 employees with alerts
export const employees = [
  {
    employeeId: "EMP001",
    name: "John Doe",
    email: "john.doe@store.com",
    alerts: [
      { alertId: "ALT001", message: "Restock sugar in Aisle 5", timestamp: "2024-06-25T10:30:00Z", status: "pending" },
      { alertId: "ALT003", message: "Customer pickup ready - Order #ORD045", timestamp: "2024-06-25T14:15:00Z", status: "delivered" }
    ]
  },
  {
    employeeId: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@store.com",
    alerts: [
      { alertId: "ALT002", message: "Check expiry dates in dairy section", timestamp: "2024-06-25T11:00:00Z", status: "pending" }
    ]
  },
  {
    employeeId: "EMP003",
    name: "Mike Johnson",
    email: "mike.johnson@store.com",
    alerts: [
      { alertId: "ALT004", message: "Clean spill in Aisle 3", timestamp: "2024-06-25T15:20:00Z", status: "pending" },
      { alertId: "ALT005", message: "Restock bread in bakery section", timestamp: "2024-06-25T16:00:00Z", status: "delivered" }
    ]
  },
  {
    employeeId: "EMP004",
    name: "Sarah Wilson",
    email: "sarah.wilson@store.com",
    alerts: [
      { alertId: "ALT006", message: "Price check needed for item P067", timestamp: "2024-06-25T12:45:00Z", status: "pending" }
    ]
  },
  {
    employeeId: "EMP005",
    name: "David Brown",
    email: "david.brown@store.com",
    alerts: [
      { alertId: "ALT007", message: "Customer assistance needed in electronics", timestamp: "2024-06-25T13:30:00Z", status: "delivered" },
      { alertId: "ALT008", message: "Restock batteries in Aisle 10", timestamp: "2024-06-25T17:00:00Z", status: "pending" }
    ]
  },
  {
    employeeId: "EMP006",
    name: "Lisa Garcia",
    email: "lisa.garcia@store.com",
    alerts: [
      { alertId: "ALT009", message: "Update price tags in produce section", timestamp: "2024-06-25T09:15:00Z", status: "pending" }
    ]
  },
  {
    employeeId: "EMP007",
    name: "Robert Martinez",
    email: "robert.martinez@store.com",
    alerts: [
      { alertId: "ALT010", message: "Organize frozen food section", timestamp: "2024-06-25T14:45:00Z", status: "delivered" }
    ]
  },
  {
    employeeId: "EMP008",
    name: "Emily Davis",
    email: "emily.davis@store.com",
    alerts: [
      { alertId: "ALT011", message: "Stock check for low inventory items", timestamp: "2024-06-25T11:30:00Z", status: "pending" },
      { alertId: "ALT012", message: "Customer complaint - checkout line 3", timestamp: "2024-06-25T16:30:00Z", status: "pending" }
    ]
  },
  {
    employeeId: "EMP009",
    name: "Christopher Lee",
    email: "christopher.lee@store.com",
    alerts: [
      { alertId: "ALT013", message: "Maintenance needed for cart #45", timestamp: "2024-06-25T10:00:00Z", status: "delivered" }
    ]
  },
  {
    employeeId: "EMP010",
    name: "Amanda Taylor",
    email: "amanda.taylor@store.com",
    alerts: [
      { alertId: "ALT014", message: "Train new employee on register system", timestamp: "2024-06-25T08:30:00Z", status: "pending" },
      { alertId: "ALT015", message: "Inventory count for pet supplies", timestamp: "2024-06-25T15:45:00Z", status: "delivered" }
    ]
  }
];
