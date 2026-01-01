/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod"

// Task schema for task management examples
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["todo", "in-progress", "done", "canceled"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
  createdAt: z.string(),
  tags: z.array(z.string()).optional(),
})

export type Task = z.infer<typeof taskSchema>

// User schema for user directory examples
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "editor", "viewer", "guest"]),
  status: z.enum(["active", "inactive", "pending"]),
  lastLogin: z.string().optional(),
  avatar: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
})

export type User = z.infer<typeof userSchema>

// Product schema for e-commerce examples
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
  status: z.enum(["in-stock", "low-stock", "out-of-stock", "discontinued"]),
  rating: z.number().min(0).max(5),
  tags: z.array(z.string()).optional(),
  createdAt: z.string(),
  image: z.string().optional(),
})

export type Product = z.infer<typeof productSchema>

// Order schema for order management examples
export const orderSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  total: z.number(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "canceled", "refunded"]),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
  orderDate: z.string(),
  items: z.number(),
  tracking: z.string().optional(),
})

export type Order = z.infer<typeof orderSchema>

// Analytics data schema for reports
export const analyticsSchema = z.object({
  id: z.string(),
  metric: z.string(),
  value: z.number(),
  change: z.number(), // percentage change
  category: z.string(),
  period: z.string(),
  trend: z.enum(["up", "down", "stable"]),
  target: z.number().optional(),
})

export type Analytics = z.infer<typeof analyticsSchema>

// Simple data schema for basic examples
export const simpleDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  category: z.string(),
})

export type SimpleData = z.infer<typeof simpleDataSchema>