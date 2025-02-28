// ✅ Exporteer alle headers individueel
export { default as Header1 } from "./Header1";
export { default as Header2 } from "./Header2";
/*export { default as Header3 } from "./Header3";
export { default as Header4 } from "./Header4";
export { default as Header5 } from "./Header5";
export { default as Header6 } from "./Header6";
export { default as Header7 } from "./Header7";
export { default as Header8 } from "./Header8";
export { default as Header9 } from "./Header9";
export { default as Header10 } from "./Header10";*/

// ✅ Importeer alle headers in een object
import Header1 from "./Header1";
import Header2 from "./Header2";
/*import Header3 from "./Header3";
import Header4 from "./Header4";
import Header5 from "./Header5";
import Header6 from "./Header6";
import Header7 from "./Header7";
import Header8 from "./Header8";
import Header9 from "./Header9";
import Header10 from "./Header10";*/

// ✅ Maak een dynamisch object waarin alle headers zitten
const headers: { [key: string]: React.FC } = {
  header1: Header1,
  header2: Header2,
 /* header3: Header3,
  header4: Header4,
  header5: Header5,
  header6: Header6,
  header7: Header7,
  header8: Header8,
  header9: Header9,
  header10: Header10,*/
};

export default headers;

/* const headers = {
    Header1: () => (
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1>Header 1 - Standaard Blauw</h1>
      </header>
    ),
    Header2: () => (
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1>Header 2 - Donker Thema</h1>
      </header>
    ),
    Header3: () => (
      <header className="bg-green-500 text-white p-4 text-center">
        <h1>Header 3 - Groen Thema</h1>
      </header>
    ),
    Header4: () => (
      <header className="bg-red-500 text-white p-4 text-center">
        <h1>Header 4 - Rood Thema</h1>
      </header>
    ),
  };
  */