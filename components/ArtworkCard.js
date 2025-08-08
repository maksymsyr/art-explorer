import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Card from "react-bootstrap/Card";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  if (data) {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={
              data.primaryImageSmall ||
              "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
          />
          <Card.Body>
            <Card.Title>{data.title || "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>
              {data.objectDate || "N/A"}
              <br />
              <strong>Classification: </strong>
              {data.classification || "N/A"}
              <br />
              <strong>Medium: </strong> {data.medium || "N/A"}
              <br />
            </Card.Text>
            <Link passHref href={`/artwork/${objectID}`}>
              <Button variant="outline-dark">
                <strong>ID: </strong>
                {objectID}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  } else if (!data) {
    return null;
  }
}
