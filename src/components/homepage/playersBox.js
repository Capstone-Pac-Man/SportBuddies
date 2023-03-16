import { Row, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

export const PlayersBox = () => {
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
                <h3>Player #1</h3>
                <p>Player Info</p>
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
                <h3>Player #2</h3>
                <p>Player Info</p>
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
                <h3>Player #3</h3>
                <p>Player Info</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Card.Body>
      </Card>
    </Row>
  );
};
