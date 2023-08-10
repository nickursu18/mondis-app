"use client";
import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Pagination } from "@mantine/core";



export default function Home() {
  const [orders, setOrders] = useState<any[]>([]);
  const supabaseUrl: any = "https://pkrvehrepdgvyksotuyg.supabase.co";
  const supabaseKey: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [activePage, setPage] = useState(1);
  async function getData() {
    const { data: orders } = await supabase.from("orders").select();
    const amp: any = orders;
    setOrders(amp);
  }
  async function updateStatus(orderSt: any, orderId: any) {
    const { data: orders } = await supabase
      .from("orders")
      .update({ orderStatus: orderSt })
      .eq("id", orderId);
    alert("Status Updated Successfully!");
  }
  async function updateEstimate(finalEst: any, orderId: any) {
    const { data: orders } = await supabase
      .from("orders")
      .update({ finalEstimate: finalEst })
      .eq("id", orderId);
    //alert("Estimation Updated Successfully!");
  }
  async function updateGiftCard(giftCard: any, orderId: any) {
    const { data: orders } = await supabase
      .from("orders")
      .update({ giftCardCode: giftCard })
      .eq("id", orderId);
    //alert("Estimation Updated Successfully!");
  }


  if (orders.length === 0) {
    getData();
  }

  const itemsPerPage = 10;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the orders to display on the current page
  const ordersToShow = useMemo(
    () => orders?.slice(startIndex, endIndex),
    [activePage, orders]
  );




  return (
    <main className="flex flex-col items-center justify-between">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Numărul comenzii</th>
            <th>Numele Clientului</th>
            <th>Nr. Produse</th>
            <th>Estimarea</th>
            <th>Statutul Coletului</th>
            <th>Validarea</th>
            <th>Gift Card</th>
            <th className="w-full">Products</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {ordersToShow.map((order: any, i: any) => (
            <tr key={order.id + i}>
              <td>{order.id}</td>
              <td>{order.address_data.name}</td>
              <td>{order.nproduct}</td>
              <td>{order.amtproduct}</td>
              <td>
                <select
                  onChange={(event) =>
                    updateStatus(event.target.value, order.id)
                  }
                >
                  <option
                    value="0"
                    selected={order.orderStatus == 0 ? true : false}
                  >
                    Waiting Courier Pickup
                  </option>
                  <option
                    value="1"
                    selected={order.orderStatus == 1 ? true : false}
                  >
                    Waiting to be Delivered
                  </option>
                  <option
                    value="2"
                    selected={order.orderStatus == 2 ? true : false}
                  >
                    Estimation Recieved
                  </option>
                  <option
                    value="3"
                    selected={order.orderStatus == 3 ? true : false}
                  >
                    Estimation Approved
                  </option>
                  <option
                    value="4"
                    selected={order.orderStatus == 4 ? true : false}
                  >
                    Digital Contract Signed
                  </option>
                  <option
                    value="5"
                    selected={order.orderStatus == 5 ? true : false}
                  >
                    Gift Card Issued
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={order.finalEstimate}
                  onChange={(event) =>
                    updateEstimate(event.target.value, order.id)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={order.giftCardCode}
                  onChange={(event) =>
                    updateGiftCard(event.target.value, order.id)
                  }
                />
              </td>
              <td>
                {order.cart_data?.map((cartItem: any, i: any) => {
                  return (
                    <span key={i} className="w-full">
                      {cartItem.brand + " " + cartItem.subcatname}: $
                      {cartItem.estimate} <br />
                    </span>
                  );
                })}
              </td>
              {/* <td>
                <button
                  className="mbtn"
                  onClick={() => alert("Updated Successfully!")}
                >
                  Save
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        color="#CD76BA"
        styles={{
          control: {
            "&[data-active]": {
              backgroundColor: "#CD76BA",
              border: 0,
            },
          },
        }}
        className="py-10"
        value={activePage}
        onChange={setPage}
        total={Number(Math.ceil(orders.length / 10))}
      />
    </main>
  );
}
