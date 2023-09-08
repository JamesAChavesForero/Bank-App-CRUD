export const fetchRequest = async (route, method, petitionBody) => {
    let reqConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorId: "57",
      },
      method: method,
    };

    if (petitionBody) {
      reqConfig.body = JSON.stringify(petitionBody);
    }

    const response = await fetch(route, reqConfig);
  return (response.status === 204 ? null : response.json());
}
