import { FormEvent, useState } from "react";
import { Button, Card, Form, FormCheck, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosconfig from "../utils/axiosconfig";

export default function KonuKaydetComponent() {
  // state olmasa da gayet normal olabilirdi
  // bu örneği state siz yapmaya çalışabilirsiniz, mesela useref veya form kütüphaneleri
  const [konuName, setKonuName] = useState<string>("");

  const mynavigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // form sayfayı post ettirmesin diye
    event.preventDefault();
    // burası görünemse de bir json veya bir class
    // burada Ikonu de kullanılabilir ama id 'ye ihtiyacım yok
    const sendData = {
      name: konuName,
    };
    axiosconfig.post("konu/save", sendData).then((res) => {
      if (res.status == 200) {
        // navlink yerine router üzerinden navigate
        // /konu linkine tıklamış gibi
        mynavigate("/konu");
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
              setKonuName(e.target.value);
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
