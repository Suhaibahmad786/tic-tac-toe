<?php

add_action( 'woocommerce_before_calculate_totals', 'enforce_plugin_min_qty', 10, 1 );

function enforce_plugin_min_qty( $cart ) {

    if ( is_admin() && ! defined( 'DOING_AJAX' ) )
        return;

    foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) {

        $product_id = $cart_item['product_id'];

        // plugin minimum quantity get karo
        $min_qty = get_post_meta( $product_id, 'woodecimalproduct_min_qnt', true );

        if ( $min_qty && $cart_item['quantity'] < $min_qty ) {

            $cart_item['quantity'] = $min_qty;

            wc_add_notice(
                get_the_title($product_id) . ' minimum quantity is ' . $min_qty,
                'error'
            );

        }

    }

}


add_filter( 'woocommerce_checkout_cart_item_quantity', 'disable_checkout_qty_edit_plugin', 10, 3 );

function disable_checkout_qty_edit_plugin( $quantity, $cart_item, $cart_item_key ) {

    return '<span>' . $cart_item['quantity'] . '</span>';

}






https://wordpress.org/plugins/change-quantity-on-checkout-for-woocommerce/
