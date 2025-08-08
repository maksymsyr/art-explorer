import { getToken } from "./authenticate";

export async function addToFavourites(id) {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function getFavourites() {
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function addToHistory(id) {
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function removeFromHistory(id) {
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function getHistory() {
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}
