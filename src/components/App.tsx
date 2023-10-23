import { useEffect, useState, useRef, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import "./App.css";
import { ApiAutocomlit } from "../utils/Api";

interface IResApi {
  domain: string;
  logo: string;
  name: string;
}

function App() {
  const [isValueInput, setValueInput] = useState("");
  const [isResApi, setResApi] = useState<IResApi[]>([]);
  const inputFocus = useRef<HTMLInputElement>(null);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClickItem = (value: string): void => {
    setValueInput(value);
  };

  useEffect(() => {
    if (inputFocus.current) inputFocus.current.focus();
    if (isValueInput) {
      ApiAutocomlit.searchAutocomplit(isValueInput)
        .then((data) => {
          setResApi(data);
        })
        .catch((err) => {
          console.log(`this-${err}`);
        });
    } else {
      setResApi([]);
    }
  }, [isValueInput]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="form__label">
          Компания
          <input
            className="form__input"
            type="text"
            name="autocomplete"
            autoComplete="first"
            value={isValueInput}
            onChange={handleChangeInput}
            ref={inputFocus}
          />
        </label>
      </form>

      {isResApi.length === 0 ? (
        ""
      ) : (
        <div className="info">
          {isResApi &&
            isResApi.map((item, index) => {
              return (
                <div
                  className="info__box"
                  key={index}
                  onClick={() => handleClickItem(item.name)}
                >
                  <img className="info__img" src={item.logo} alt="логотип" />

                  <div className="info__titles-box">
                    <p className="info__name">{item.name}</p>
                    <Link
                      className="info__domain"
                      to={`https://www.${item.domain}`}
                      target="_blanck"
                    >
                      {item.domain}
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;
