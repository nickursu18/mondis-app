"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import {
  Button,
  Select,
  TextInput,
  Textarea,
  clsx,
  createStyles,
} from "@mantine/core";
import axios from "axios";
import { fetchCounties, fetchLocalities, fetchStreets } from "./action";

export default function Home() {
  let estimateTotal = 0;
  // const cartData =
  //   typeof window !== "undefined"
  //     ? JSON.parse(
  //         "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
  //       )
  //     : null;
  const [countiesData, setCounties] = useState([]);
  const [locaitesData, setLocalities] = useState([]);
  const [streetData, setStreet] = useState<any>([]);
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .message("Name should have at least 2 letters")
      .required(),
    familyName: Joi.string().allow(null, "").optional(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message("Invalid email")
      .required(),
    phone: Joi.string().required(),
    county: Joi.string().required(),
    locality: Joi.string().required(),
    street: Joi.string().required(),
    postalCode: Joi.number().required(),
    building: Joi.string().required(),
    entrance: Joi.string().optional().allow(null, ""),
    floor: Joi.string().optional().allow(null, ""),
    apartment: Joi.string().optional().allow(null, ""),
    additional: Joi.string().optional().allow(null, ""),
  });
  const initialValues = {
    name: "",
    familyName: "",
    email: "",
    phone: "",
    county: "",
    locality: "",
    street: "",
    postalCode: "",
    building: "",
    entrance: "",
    floor: "",
    apartment: "",
    additional: "",
  };
  const { classes } = inputStyles();
  const form = useForm({
    initialValues,
    validate: joiResolver(schema),
  });
  const router = useRouter();

  const addressS = {
    id: nanoid(),
    name: form.values.name,
    familyName: form.values.familyName,
    email: form.values.email,
    phone: form.values.phone,
    country: form.values.county,
    city: form.values.locality,
    street: form.values.street,
    postalCode: form.values.postalCode,
    building: form.values.building,
    entrance: form.values.entrance,
    floor: form.values.floor,
    apartment: form.values.apartment,
    additional: form.values.additional,
  };
  function addAddress() {
    localStorage.setItem(
      "address",
      localStorage.getItem("address") + "," + JSON.stringify(addressS)
    );
  }

  const [cartData, setCartData] = useState(
    typeof window !== "undefined"
      ? JSON.parse(
          "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
        )
      : null
  );

  const deleteProduct = (id: string) => {
    const storeArray: any[] = JSON.parse(
      "[" +
        localStorage.getItem("items")?.substring(0).replace("null,", "") +
        "]"
    );

    const updatedArray: any[] = storeArray.filter(
      (item: any) => item.id !== id
    );

    var commaSeparatedString = updatedArray
      .map((obj) => {
        return JSON.stringify(obj);
      })
      .join(", ");

    console.log(commaSeparatedString);

    setCartData(updatedArray);
    if (updatedArray?.length === 0) {
      localStorage.setItem("items", "null");
      return;
    }
    localStorage.setItem("items", "null," + commaSeparatedString);
    // localStorage.setItem("items", JSON.stringify(updatedArray));
  };

  useEffect(() => {
    if (cartData.length === 0) {
      router.push("/");
    }
  }, [cartData]);
  const setCountyData = async () => {
    const data = await fetchCounties();
    if (data) {
      const counties = data.map((item: any) => item.name);
      setCounties(counties);
    }
  };
  const setLocalityData = async (county: string) => {
    const data = await fetchLocalities(county);
    if (data) {
      const locaties = data.map((item: any) => item.name);
      setLocalities(locaties);
    }
  };
  const setStreetData = async (county: string, locality: string) => {
    let page = 1;
    let count = 1;
    const arr: any = [];
    for (page; page <= count; page++) {
      const { total, data } = await fetchStreets(county, locality, page);
      count = Number((total / 100).toFixed());
      arr.push(...data);
    }
    if (arr?.length !== 0) {
      setStreet(arr);
    }
  };
  useEffect(() => {
    setCountyData();
  }, []);

  useEffect(() => {
    if (form.values.county) {
      setLocalityData(form.values.county);
    } else {
      setLocalities([]);
      setStreet([]);
      form.setFieldValue("locality", "");
      form.setFieldValue("street", "");
    }
  }, [form.values.county]);

  useEffect(() => {
    if (form.values.locality) {
      setStreetData(form.values.county, form.values.locality);
    } else {
      form.setFieldValue("street", "");
      setStreet([]);
    }
  }, [form.values.locality]);

  useEffect(() => {
    if (form.values.street) {
      const zipcode = streetData.find(
        (item: any) =>
          form.values.street.includes(item.street) &&
          form.values.street.includes(item.type)
      )?.details[0].zipCode;
      form.setFieldValue("postalCode", zipcode);
    } else {
      form.setFieldValue("postalCode", "");
    }
  }, [form.values.street]);

  const handleSubmit = async (values: typeof initialValues) => {
    addAddress();
    router.push("/address");
  };

  console.log(form.errors);

  return (
    <main className="flex flex-col items-center justify-between">
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <div className="header flex flex-col sm:flex-row items-center">
        <a href="https://mondis.ro">
          <img src="logo.png" className="logo" />
        </a>
        <div className="flex flex-col space-y-4 sm:space-y-0 items-center sm:flex-row mt-4 sm:mt-[0]">
          <a href="/" className="menu-item sm:p-[30px]">
            Primiți o ofertă
          </a>
          <a href="/parcels" className="menu-item sm:p-[30px]">
            Coletele Dvs.
          </a>
          <a href="https://mondis.ro" className="menu-item sm:p-[30px]">
            Înapoi spre magazin
          </a>
        </div>
      </div>
      <hr className="bline w-full" />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="w-full stepsContainer">
          <div className="lg:grid lg:grid-cols-2 lg:gap-10">
            <div className="items-start text-left space-y-4">
              <h3 className="topH">Adaugă adresa </h3>
              <br />

              <br />
              <p className="labl2">Destinatar</p>
              <br />
              <div className="flex cols-2 gap-5 w-full">
                <div>
                  <b className="labl">Nume</b>
                  <br />
                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("name")}
                  />
                </div>
                <div>
                  <b className="labl">Prenume</b>
                  <br />

                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("familyName")}
                  />
                </div>
              </div>
              <div className="flex cols-2 gap-5 w-full">
                <div>
                  <b className="labl">Telefon</b>
                  <br />
                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("phone")}
                  />
                </div>
                <div>
                  <b className="labl">E-mail</b>
                  <br />
                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("email")}
                  />
                </div>
              </div>
              <br />
              <p className="labl2">Adresa</p>
              <br />
              <div className="flex cols-2 gap-5 w-full">
                <div>
                  <b className="labl">Județ</b>
                  <br />
                  <Select
                    data={countiesData}
                    clearable
                    classNames={classes}
                    searchable
                    {...form.getInputProps("county")}
                  />
                </div>
                <div>
                  <b className="labl">Oraș</b>
                  <br />
                  <Select
                    data={locaitesData}
                    classNames={classes}
                    searchable
                    clearable
                    nothingFound="No Option"
                    {...form.getInputProps("locality")}
                  />
                </div>
              </div>
              <div className="flex cols-2 gap-5 w-full">
                <div>
                  <b className="labl">Strada</b>
                  <br />
                  <Select
                    data={streetData
                      .filter((item: any) => item.street !== "")
                      .map((item: any) => `${item.street} (${item.type})`)}
                    classNames={classes}
                    searchable
                    clearable
                    nothingFound="No Option"
                    {...form.getInputProps("street")}
                  />
                </div>
                <div>
                  <b className="labl">Cod poștal</b>
                  <br />

                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("postalCode")}
                  />
                </div>
              </div>
              <div className="flex cols-2 gap-5 w-full">
                <div>
                  <b className="labl">Blocul/Numarul</b>
                  <br />
                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("building")}
                  />
                </div>
                <div>
                  <b className="labl">Scara</b>
                  <br />
                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("entrance")}
                  />
                </div>
              </div>
              <div className="flex cols-2 gap-5 w-full">
                <div>
                  <b className="labl"> Etaj</b>
                  <br />
                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("floor")}
                  />
                </div>
                <div>
                  <b className="labl">Apartament</b>
                  <br />
                  <TextInput
                    classNames={classes}
                    {...form.getInputProps("apartment")}
                  />
                </div>
              </div>
              <div>
                <b className="labl">Informații suplimentare</b>
                <br />
                <Textarea
                  classNames={classes}
                  {...form.getInputProps("additional")}
                />
              </div>
              <Button
                disabled={!form.isValid()}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "#CD76BA",
                    },
                  },
                }}
                type="submit"
                size="md"
                className="mbtn mt-5 w-full"
              >
                Salvează adresă
              </Button>
            </div>
            <div className="lg:twoSec mt-10 lg:mt-0">
              <div
                className="items-start text-left amp2"
                style={{ width: "100%" }}
              >
                <h1 className="secHead2">Produse de vânzare</h1>
                <br />
                {cartData?.map((cartItem: any, i: any) => {
                  estimateTotal += parseInt(cartItem.estimate);
                  return (
                    <div key={i} className="item">
                      <div className="flex">
                        <img
                          alt="trash"
                          onClick={() => deleteProduct(cartItem.id)}
                          src="trashicon.svg"
                        />
                        <span className="prodname  w-full">
                          {cartItem.gender.toUpperCase() +
                            " " +
                            cartItem.brand.toUpperCase() +
                            " " +
                            cartItem.subcatname}{" "}
                        </span>
                        <span className="prodname text-right items-right">
                          {cartItem.estimate} lei
                        </span>
                      </div>
                    </div>
                  );
                })}

                <br />
                <hr className="rline" />
                <br />
                <div className="item">
                  <div className="flex">
                    <span className="prodname2  w-full text-lg">
                      Veți primi{" "}
                    </span>
                    <span className="prodnamen text-right items-right">
                      {estimateTotal} lei
                    </span>
                  </div>
                </div>

                <p className="text-md mt-10">
                  Vindeți mai ușor, mai ieftin și cu transport gratuit către
                  Mondis!
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

const inputStyles = createStyles(() => ({
  input: {
    "&:focus": {
      border: "1px solid black",
    },
    boxSizing: "border-box",
    color: "#808080",
    fontSize: "14px",
    width: "100%",
    fontFamily: "sans-serif",
    padding: "25px",
    background: "#F7F7F7",
    border: "1px solid #D8D8D8",
    borderRadius: "10px",
  },
}));
