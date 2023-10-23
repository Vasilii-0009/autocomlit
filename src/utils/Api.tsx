class Api {
  constructor(public url: string) {
    this.url = url;
  }

  _checkResponse(data: Promise<Response>) {
    return data.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status}`);
    });
  }

  searchAutocomplit(value: string) {
    const searchAutocomplit = fetch(`${this.url}query=${value}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return this._checkResponse(searchAutocomplit);
  }
}

export const ApiAutocomlit = new Api(
  "https://autocomplete.clearbit.com/v1/companies/suggest?"
);
