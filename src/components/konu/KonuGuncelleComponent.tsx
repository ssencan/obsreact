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
import { IKonu } from "../model/IKonu";

export default function KonuGuncelleComponent() {
  let konuId = new URLSearchParams(window.location.search).get("konuId");
  const [konuName, setKonuName] = useState<string>("");
  const [isloading, setisloading] = useState<boolean>(true);

  const mynavigate = useNavigate();

  useEffect(() => {
    axiosconfig.get("konu/getbyid/" + konuId).then((response) => {
      try {
        const konu: IKonu = response.data;
        setKonuName(konu.name);
        setisloading(false);
      } catch (err) {}
    });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    var konu: IKonu = { id: 0, name: "" };
    konu.id = parseInt(konuId + "");
    konu.name = konuName;
    axiosconfig.post("konu/update", konu).then((res) => {
      if (res.status == 200) {
        mynavigate("/konu");
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
                value={konuName}
                onChange={(e) => {
                  setKonuName(e.target.value);
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
