<?php
namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {

        $rules = [
            'name'     => 'required',
            'email'    => 'required | email | unique:users,email',
            'password' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'customer',
        ]);

        return response()->json([
            'status'  => 200,
            'user'    => $user,
            'message' => 'User created successfully',
        ], 200);

    }

    public function login(Request $request)
    {
        $rules = [
            'email'    => 'required | email',
            'password' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = User::find(Auth::user()->id);

            $token = $user->createToken('token')->plainTextToken;

            return response()->json([
                'status'  => 200,
                'token'   => $token,
                'id'      => $user->id,
                'name'    => $user->name,
                'message' => 'Login successfully',
            ], 200);
        } else {
            return response()->json([
                'status'  => 401,
                'message' => 'Either email or password is incorrect',
            ], 401);
        }
    }

    public function getOrderDetails($id, Request $request)
    {
        $order = Order::where(['user_id' => $request->user()->id, 'id' => $id])->with('items', 'items.product')->first();

        if ($order == null) {
            return response()->json([
                'status'  => 404,
                'message' => 'Order not found',
            ], 404);
        }

        return response()->json([
            'status'  => 200,
            'data'    => $order,
            'message' => 'Order found successfully',
        ], 200);

    }

    public function getOrders(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)->get();

        return response()->json([
            'status'  => 200,
            'data'    => $orders,
            'message' => 'Orders found successfully',
        ]);

    }

    public function updateProfile(Request $request)
    {

        $user = User::find($request->user()->id);

        if ($user == null) {
            return response()->json([
                'status'  => 404,
                'message' => 'User not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'    => 'required',
            'email'   => 'required | email | unique:users,email,' . $request->user()->id, 'id',
            'city'    => 'required | max:50',
            'state'   => 'required | max:50',
            'zip'     => 'required | max:50',
            'address' => 'required | max:50',
            'mobile'  => 'required | max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $user->name    = $request->name;
        $user->email   = $request->email;
        $user->city    = $request->city;
        $user->state   = $request->state;
        $user->zip     = $request->zip;
        $user->address = $request->address;
        $user->mobile  = $request->mobile;

        $user->save();

        return response()->json([
            'status'  => 200,
            'user'    => $user,
            'message' => 'User updated successfully',
        ], 200);

    }

    public function getAccountDetails(Request $request)
    {
        $user = User::find($request->user()->id);

        if (! $user) {
            return response()->json([
                'status'  => 404,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'status'  => 200,
            'data'    => $user,
            'message' => 'User found successfully',
        ], 200);
    }

}
