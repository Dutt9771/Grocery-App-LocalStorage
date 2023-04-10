export const environment = {
       // baseUrl:"https://e099-117-217-127-105.in.ngrok.io/api/v1/",
    baseUrl:"https://1f85-117-217-127-105.ngrok-free.app/api/v1/",
    baseurl:"http://localhost:3000/",
    resname:"cart",
    customers_routes:{
        user_login:"customer/login",
        user_register:"customer/register",
        edit_user:"customer/update-customer",
        add_address:"customer/add-customer-address",
        user_details:"customer/customer-details",
        change_password:"customer/changePassword",
        update_address:"customer/update-customer-address",
        delete_address:"customer/delete-customer-address",
        get_customer_all_orders:"customer/get-customer-all-orders"
    },
    products_routes:{
        get_all_products:"product/get-all-products",
        get_product_by_id:"product/get-product-by-id",
        get_product_by_category_id:"product/get-product-by-category-id",
    },
    category_routes:{
        all_category:"category/get-all-categories",

    },
    orders_routes:{
        add_order:"order/add-order",
        get_order_by_id:"order/get-order-by-id"
    },
    payment_status:{

        payment_status:"payment-status/get-master-data"

    },
    encryption:"encryption"
    
};
