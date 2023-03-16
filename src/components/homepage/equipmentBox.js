import { Row, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

export const EquipmentsBox = () => {
  return (
    <Row>
      <Card
        bg="secondary"
        style={{
          height: "250px",
        }}
      >
        <Card.Body>
          <Carousel>
            <Carousel.Item>
              <Card.Img
                style={{
                  width: "500px",
                  height: "210px",
                }}
                src="https://dummyimage.com/600x400/f08d46/fff"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Equipment #1</h3>
                <p>Equipment Info</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Card.Img
                style={{
                  width: "500px",
                  height: "210px",
                }}
                src="https://dummyimage.com/600x400/f08d46/fff"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Equipment #2</h3>
                <p>Equipment Info</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Card.Img
                style={{
                  width: "500px",
                  height: "210px",
                }}
                src="https://dummyimage.com/600x400/f08d46/fff"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Equipment #3</h3>
                <p>Equipment Info</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Card.Body>
      </Card>
    </Row>
  );
};
