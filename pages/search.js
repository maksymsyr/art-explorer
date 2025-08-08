import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";

export default function AdvancedSearch() {
  const router = useRouter();
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchBy: "title",
      geoLocation: "",
      medium: "",
      isOnView: false,
      isHighlight: false,
      q: "",
    },
  });

  async function submitForm(data) {
    let queryString = `${data.searchBy}=true`;

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    setSearchHistory(await addToHistory(queryString));

    router.push(`/artwork?${queryString}`);
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)} noValidate>
      <Form.Group className="mb-3" controlId="q">
        <Form.Label>Search Query</Form.Label>
        <Form.Control
          type="text"
          {...register("q", { required: true })}
          isInvalid={!!errors.q}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="searchBy">
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")} defaultValue="Title">
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artist or culture">Artist or Culture</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="geoLocation">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" {...register("geoLocation")} />
            <Form.Text className="text-secondary">
              Case Sensitive String (e.g., "Europe", "France", "Paris", "China",
              "New York", etc.), with multiple values separated by the |
              operator
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="medium">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" {...register("medium")} />
            <Form.Text className="text-secondary">
              Case Sensitive String (e.g., "Ceramics", "Furniture", "Paintings",
              "Sculpture", "Textiles", etc.), with multiple values separated by
              the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-1" controlId="isOnView">
        <Form.Check
          type="checkbox"
          label="Currently on View"
          {...register("isOnView")}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="isHighlight">
        <Form.Check
          type="checkbox"
          label="Highlighted"
          {...register("isHighlight")}
        />
      </Form.Group>

      <Button className="bg-dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}
