import { Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function MenuComponent() {
  return (
    <Stack>
      {/* react-router-dom 'dan gelen navlik olacak */}
      <NavLink to="/">Anasayfa</NavLink>
      <NavLink
          className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "" : "",
            isActive ? "bg-info" : "",
            isTransitioning ? "" : "",
          ].join(" ")
        }
        to="/ogretmen"
      >
        Öğretmenler
      </NavLink>
      <NavLink to="/ogretmen/kaydet">Öğretmen Kaydet</NavLink>
      <NavLink to="/ogrenci">Öğrenciler</NavLink>
      <NavLink to="/ogrenci/kaydet">Öğrenci Kaydet</NavLink>
      <NavLink to="/konu">Konular</NavLink>
      <NavLink to="/konu/kaydet">Konu Kaydet</NavLink>
      <NavLink to="/ders">Dersler</NavLink>
      <NavLink to="/ders/kaydet">Ders Kaydet</NavLink>
      <NavLink to="/dersogrenci">Ders Kayıtları</NavLink>
      <NavLink to="/dersogrenci/kaydet">Ders Öğrenci Kaydet</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </Stack>
  );
}
