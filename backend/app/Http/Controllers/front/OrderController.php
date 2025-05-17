<?php
namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        if (! empty($request->cart)) {
            $order                 = new Order();
            $order->name           = $request->name;
            $order->email          = $request->email;
            $order->mobile         = $request->mobile;
            $order->address        = $request->address;
            $order->state          = $request->state;
            $order->city           = $request->city;
            $order->zip            = $request->zip;
            $order->grand_total    = $request->grand_total;
            $order->subtotal       = $request->subtotal;
            $order->discount       = $request->discount;
            $order->shipping       = $request->shipping;
            $order->payment_status = $request->payment_status;
            $order->status         = $request->status;
            $order->user_id        = $request->user()->id;
            $order->save();

            $cartItems = json_decode($request->cart, true);

            foreach ($cartItems as $item) {
                $orderItem             = new OrderItem();
                $orderItem->order_id   = $order->id;
                $orderItem->price      = $item['qty'] * $item['price'];
                $orderItem->unit_price = $item['price'];
                $orderItem->qty        = $item['qty'];
                $orderItem->product_id = $item['product_id'];
                $orderItem->size       = $item['size'];
                $orderItem->name       = $item['title'];
                $orderItem->save();
            }

            return response()->json([
                'status'  => 200,
                'id'      => $order->id,
                'message' => 'Order placed successfully',
            ], 200);

        }

        return response()->json([
            'status'  => 400,
            'message' => 'Something went wrong',
        ], 400);
    }
}
