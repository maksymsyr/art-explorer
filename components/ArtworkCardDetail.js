import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  }

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  if (data) {
    return (
      <>
        <Card>
          <Card.Img
            variant="top"
            src={
              data.primaryImage ||
              "https://via.placeholder.com/1200x600.png?text=[+Not+Available+]"
            }
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
          <Card.Body>
            <Card.Title>{data.title || "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong> {data.objectDate || "N/A"}
              <br />
              <strong>Classification: </strong> {data.classification || "N/A"}
              <br />
              <br />
              <strong>Medium: </strong> {data.medium || "N/A"}
              <br />
              <strong>Artist: </strong>
              {data.artistDisplayName ? (
                <>
                  {data.artistDisplayName} {"( "}
                  {data.artistWikidata_URL && (
                    <a
                      href={data.artistWikidata_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      wiki
                    </a>
                  )}
                  {" )"}
                </>
              ) : (
                "N/A"
              )}
              <br />
              <strong>Credit Line: </strong> {data.creditLine || "N/A"}
              <br />
              <strong>Dimensions: </strong> {data.dimensions || "N/A"}
              <br />
              <br />
              <Button
                variant={showAdded ? "primary" : "outline-primary"}
                onClick={() => favouritesClicked()}
              >
                {" "}
                {showAdded ? "+ Favourite (added)" : "+ Favourite"}
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  } else if (!data) {
    return null;
  }
}
