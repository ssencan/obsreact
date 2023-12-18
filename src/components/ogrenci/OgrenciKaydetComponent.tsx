import { FormEvent, useState } from "react";
import { Button, Card, Form, FormCheck, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosconfig from "../utils/axiosconfig";

export default function OgrenciKaydetComponent() {
  // state olmasa da gayet normal olabilirdi
  // bu örneği state siz yapmaya çalışabilirsiniz, mesela useref veya form kütüphaneleri
  const [ogrenciName, setOgrenciName] = useState<string>("");
  const [ogrenciNumber, setOgrenciNumber] = useState<number>();
  const [ogrenciYear, setOgrenciYear] = useState<number>();

  const mynavigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // form sayfayı post ettirmesin diye
    event.preventDefault();
    // burası görünemse de bir json veya bir class
    // burada Iogrenci de kullanılabilir ama id 'ye ihtiyacım yok
    const sendData = {
      name: ogrenciName,
      OGR_NUMBER: ogrenciNumber,
      year: ogrenciYear,
    };
    axiosconfig.post("ogrenci/save", sendData).then((res) => {
      if (res.status == 200) {
        // navlink yerine router üzerinden navigate
        // /ogrenci linkine tıklamış gibi
        mynavigate("/ogrenci");
      }
    });
  }

  return (
    <Card>
      <Card.Body className="shadow">
        <Form method="post" onSubmit={(e) => handleSubmit(e)}>
          <FormControl
            type="text"
            placeholder="İsim"
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
            Ekle
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
