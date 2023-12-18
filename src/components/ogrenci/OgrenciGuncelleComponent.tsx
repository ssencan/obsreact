import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconfig from "../utils/axiosconfig";
import {
  Button,
  Card,
  Form,
  FormCheck,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import { IOgrenci } from "../model/IOgrenci";

export default function OgrenciGuncelleComponent() {
  let ogrenciId = new URLSearchParams(window.location.search).get("ogrenciId");
  const [ogrenciName, setOgrenciName] = useState<string>("");
  const [ogrenciNumber, setOgrenciNumber] = useState<number>(0);
  const [ogrenciYear, setOgrenciYear] = useState<number>(0);
  const [isloading, setisloading] = useState<boolean>(true);

  const mynavigate = useNavigate();

  useEffect(() => {
    axiosconfig.get("ogrenci/getbyid/" + ogrenciId).then((response) => {
      try {
        const ogrenci: IOgrenci = response.data;
        setOgrenciName(ogrenci.name);
        setOgrenciNumber(ogrenci.ogr_NUMBER);
        setOgrenciYear(ogrenci.year);
        setisloading(false);
      } catch (err) {}
    });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    var ogrenci: IOgrenci = { id: 0, name: "", ogr_NUMBER: 0, year: 0 };
    ogrenci.id = parseInt(ogrenciId + "");
    ogrenci.name = ogrenciName;
    ogrenci.ogr_NUMBER = ogrenciNumber;
    ogrenci.year = ogrenciYear;
    axiosconfig.post("ogrenci/update", ogrenci).then((res) => {
      if (res.status == 200) {
        mynavigate("/ogrenci");
      }
    });
  }

  return (
    <div>
      {!isloading ? (
        <Card>
          <Card.Body className="shadow">
            <Form method="post" onSubmit={(e) => handleSubmit(e)}>
              <FormControl
                type="text"
                placeholder="İsim"
                value={ogrenciName}
                onChange={(e) => {
                  setOgrenciName(e.target.value);
                }}
              ></FormControl>
              <FormControl
                type="number"
                placeholder="Numara"
                onChange={(e) => {
                  setOgrenciNumber(parseInt(e.target.value, 10));
                }}
              ></FormControl>
              <FormControl
                type="number"
                placeholder="Yıl"
                onChange={(e) => {
                  setOgrenciYear(parseInt(e.target.value, 10));
                }}
              ></FormControl>
              <Button variant="outline-primary" type="submit">
                Güncelle
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary"></Spinner>
        </Row>
      )}
    </div>
  );
}
