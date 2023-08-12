"use client";
import { useMemo, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input, Pagination } from "@mantine/core";
import { Select } from "@mantine/core";

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

  useEffect(() => {
    getData();
  }, []);

  const itemsPerPage = 5;
  const startIndex = useMemo(
    () => (activePage - 1) * itemsPerPage,
    [activePage]
  );
  const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex]);

  // Get the orders to display on the current page
  const ordersToShow = useMemo(
    () => orders?.slice(startIndex, endIndex),
    [activePage, orders, startIndex, endIndex]
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
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.address_data.name}</td>
              <td>{order.nproduct}</td>
              <td>{order.amtproduct}</td>
              <td>
                <Select
                  miw={150}
                  onChange={(event) => updateStatus(Number(event), order.id)}
                  data={[
                    { value: "0", label: "Așteptarea Colectării de Către Curier" },
                    { value: "1", label: "În Tranzit Spre Mondis" },
                    { value: "2", label: "Estimare Primită" },
                    { value: "3", label: "Estimare Aprobată" },
                    { value: "4", label: "Contract Digital Semnat" },
                    { value: "5", label: "Gift Card Emis" },
                  ]}
                  defaultValue={String(order.orderStatus)}
                />
              </td>
              <td>
                <Input
                  className="border-2 border-solid"
                  miw={100}
                  type="text"
                  defaultValue={order.finalEstimate || ""}
                  onChange={(event) =>
                    updateEstimate(event.target.value, order.id)
                  }
                />
              </td>
              <td>
                <Input
                miw={100}
                  className="border-2 border-solid"
                  type="text"
                  defaultValue={order.giftCardCode || ""}
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
        total={Number(Math.ceil(orders.length / itemsPerPage))}
      />
    </main>
  );
}
