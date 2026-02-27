'use server';

import { supabaseAdmin } from './server';

// PRODUCTS - READ
export async function getProducts() {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching products:', error?.message || JSON.stringify(error));
    return { success: false, error: error?.message || 'Unknown error fetching products' };
  }
}

export async function getProductById(id) {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { success: false, error: error.message };
  }
}

// PRODUCTS - CREATE
export async function createProduct(formData) {
  try {
    const { name, price, description, image } = formData;

    if (!name || !price) {
      return { success: false, error: 'Name and price are required' };
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          name,
          price: parseFloat(price),
          description,
          image,
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
}

// PRODUCTS - UPDATE
export async function updateProduct(id, formData) {
  try {
    const { name, price, description, image } = formData;

    if (!name || !price) {
      return { success: false, error: 'Name and price are required' };
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .update({
        name,
        price: parseFloat(price),
        description,
        image,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
}

// PRODUCTS - DELETE
export async function deleteProduct(id) {
  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
}

// ORDERS - CREATE
export async function createOrder(orderData) {
  try {
    const { fullName, phone, address, email, products, totalPrice } = orderData;

    if (!fullName || !phone || !address || !products || !totalPrice) {
      return { success: false, error: 'All fields are required' };
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          full_name: fullName,
          phone,
          address,
          email,
          products,
          total_price: parseFloat(totalPrice),
          status: 'pending',
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
}

// ORDERS - READ ALL
export async function getOrders() {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: error.message };
  }
}

// ORDERS - READ BY ID
export async function getOrderById(id) {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: error.message };
  }
}

// ADMIN - VERIFY PIN
export async function verifyAdminPin(pin) {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('pin', pin)
      .single();

    if (error) {
      return { success: false, error: 'Invalid PIN' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return { success: false, error: 'Invalid PIN' };
  }
}

// ADMIN - CREATE PIN
export async function createAdminPin(pin, name = 'Admin') {
  try {
    if (!pin || pin.length < 4) {
      return { success: false, error: 'PIN must be at least 4 digits' };
    }

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .insert([
        {
          pin,
          name,
        },
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'PIN already exists' };
      }
      throw error;
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error creating admin PIN:', error);
    return { success: false, error: error.message };
  }
}
