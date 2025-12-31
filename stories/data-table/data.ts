/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Task, User, Product, Order, Analytics, SimpleData } from './schema'

// Task data for task management examples
export const tasks: Task[] = [
  {
    id: "1",
    title: "Fix authentication bug in login form",
    status: "in-progress",
    priority: "high",
    assignee: "John Doe",
    dueDate: "2024-02-15",
    createdAt: "2024-01-10",
    tags: ["bug", "authentication", "frontend"],
  },
  {
    id: "2",
    title: "Implement user dashboard analytics",
    status: "todo",
    priority: "medium",
    assignee: "Jane Smith",
    dueDate: "2024-02-20",
    createdAt: "2024-01-12",
    tags: ["feature", "analytics", "dashboard"],
  },
  {
    id: "3",
    title: "Optimize database queries for reports",
    status: "done",
    priority: "critical",
    assignee: "Bob Johnson",
    createdAt: "2024-01-08",
    tags: ["performance", "database", "optimization"],
  },
  {
    id: "4",
    title: "Update API documentation",
    status: "todo",
    priority: "low",
    assignee: "Alice Brown",
    dueDate: "2024-02-25",
    createdAt: "2024-01-15",
    tags: ["documentation", "api"],
  },
  {
    id: "5",
    title: "Implement dark mode theme",
    status: "in-progress",
    priority: "medium",
    assignee: "Charlie Wilson",
    dueDate: "2024-02-18",
    createdAt: "2024-01-11",
    tags: ["feature", "ui", "theme"],
  },
  {
    id: "6",
    title: "Set up CI/CD pipeline",
    status: "canceled",
    priority: "high",
    assignee: "David Lee",
    createdAt: "2024-01-05",
    tags: ["devops", "ci-cd", "automation"],
  },
  {
    id: "7",
    title: "Add unit tests for payment module",
    status: "todo",
    priority: "high",
    assignee: "Eva Garcia",
    dueDate: "2024-02-22",
    createdAt: "2024-01-14",
    tags: ["testing", "payment", "quality"],
  },
  {
    id: "8",
    title: "Refactor user settings component",
    status: "done",
    priority: "medium",
    assignee: "Frank Miller",
    createdAt: "2024-01-09",
    tags: ["refactor", "component", "settings"],
  },
]

// User data for user directory examples
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15",
    department: "Engineering",
    location: "San Francisco",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "editor",
    status: "active",
    lastLogin: "2024-01-14",
    department: "Marketing",
    location: "New York",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2024-01-10",
    department: "Sales",
    location: "Chicago",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@company.com",
    role: "editor",
    status: "active",
    lastLogin: "2024-01-16",
    department: "Design",
    location: "Seattle",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15",
    department: "Engineering",
    location: "Austin",
  },
  {
    id: "6",
    name: "Eva Garcia",
    email: "eva.garcia@company.com",
    role: "guest",
    status: "pending",
    department: "HR",
    location: "Miami",
  },
]

// Product data for e-commerce examples
export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 45,
    status: "in-stock",
    rating: 4.5,
    createdAt: "2024-01-10",
    tags: ["wireless", "bluetooth", "audio"],
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 299.00,
    stock: 12,
    status: "low-stock",
    rating: 4.2,
    createdAt: "2024-01-08",
    tags: ["office", "ergonomic", "chair"],
  },
  {
    id: "3",
    name: "Smartphone Case",
    category: "Accessories",
    price: 24.99,
    stock: 0,
    status: "out-of-stock",
    rating: 3.8,
    createdAt: "2024-01-12",
    tags: ["phone", "protection", "case"],
  },
  {
    id: "4",
    name: "Coffee Maker",
    category: "Appliances",
    price: 149.99,
    stock: 8,
    status: "low-stock",
    rating: 4.7,
    createdAt: "2024-01-05",
    tags: ["coffee", "appliance", "kitchen"],
  },
  {
    id: "5",
    name: "Desk Lamp",
    category: "Lighting",
    price: 49.99,
    stock: 25,
    status: "in-stock",
    rating: 4.1,
    createdAt: "2024-01-14",
    tags: ["desk", "led", "adjustable"],
  },
]

// Order data for order management examples
export const orders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Sarah Connor",
    customerEmail: "sarah.connor@email.com",
    total: 299.99,
    status: "delivered",
    paymentStatus: "paid",
    orderDate: "2024-01-10",
    items: 2,
    tracking: "TRK-123456789",
  },
  {
    id: "ORD-002",
    customerName: "Michael Johnson",
    customerEmail: "michael.j@email.com",
    total: 149.50,
    status: "shipped",
    paymentStatus: "paid",
    orderDate: "2024-01-12",
    items: 1,
    tracking: "TRK-987654321",
  },
  {
    id: "ORD-003",
    customerName: "Emma Davis",
    customerEmail: "emma.davis@email.com",
    total: 89.99,
    status: "processing",
    paymentStatus: "paid",
    orderDate: "2024-01-14",
    items: 3,
  },
  {
    id: "ORD-004",
    customerName: "James Wilson",
    customerEmail: "james.wilson@email.com",
    total: 199.99,
    status: "pending",
    paymentStatus: "pending",
    orderDate: "2024-01-15",
    items: 1,
  },
  {
    id: "ORD-005",
    customerName: "Lisa Thompson",
    customerEmail: "lisa.t@email.com",
    total: 349.99,
    status: "canceled",
    paymentStatus: "refunded",
    orderDate: "2024-01-11",
    items: 2,
  },
]

// Analytics data for dashboard examples
export const analytics: Analytics[] = [
  {
    id: "1",
    metric: "Revenue",
    value: 45234,
    change: 12.5,
    category: "Sales",
    period: "This Month",
    trend: "up",
    target: 50000,
  },
  {
    id: "2",
    metric: "New Users",
    value: 1243,
    change: -5.2,
    category: "Growth",
    period: "This Week",
    trend: "down",
    target: 1500,
  },
  {
    id: "3",
    metric: "Conversion Rate",
    value: 3.4,
    change: 8.1,
    category: "Marketing",
    period: "This Month",
    trend: "up",
    target: 4.0,
  },
  {
    id: "4",
    metric: "Page Views",
    value: 28456,
    change: 0.8,
    category: "Traffic",
    period: "Today",
    trend: "stable",
    target: 30000,
  },
  {
    id: "5",
    metric: "Customer Satisfaction",
    value: 4.2,
    change: 2.3,
    category: "Support",
    period: "This Quarter",
    trend: "up",
    target: 4.5,
  },
]

// Simple data for basic examples
export const simpleData: SimpleData[] = [
  { id: "1", name: "Apple", value: "Fruit", category: "Food" },
  { id: "2", name: "Carrot", value: "Vegetable", category: "Food" },
  { id: "3", name: "Laptop", value: "Electronics", category: "Technology" },
  { id: "4", name: "Book", value: "Novel", category: "Education" },
  { id: "5", name: "Chair", value: "Furniture", category: "Home" },
]

// Large dataset for performance testing (virtualization)
export const generateLargeDataset = (size: number = 1000): Task[] => {
  const statuses: Task['status'][] = ['todo', 'in-progress', 'done', 'canceled']
  const priorities: Task['priority'][] = ['low', 'medium', 'high', 'critical']
  const assignees = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson']
  const tags = ['bug', 'feature', 'enhancement', 'documentation', 'testing', 'performance']

  return Array.from({ length: size }, (_, i) => ({
    id: `task-${i + 1}`,
    title: `Task ${i + 1}: ${['Fix', 'Implement', 'Update', 'Add', 'Remove'][i % 5]} something important`,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    assignee: assignees[i % assignees.length],
    dueDate: new Date(2024, 1, (i % 28) + 1).toISOString().split('T')[0],
    createdAt: new Date(2024, 0, (i % 31) + 1).toISOString().split('T')[0],
    tags: [tags[i % tags.length], tags[(i + 1) % tags.length]],
  }))
}