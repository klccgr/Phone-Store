import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPhoneAction } from "../../actions/phonesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CreatePhone({ history }) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [opsys, setOpsys] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/icon-for-mobile/icon-for-mobile-12.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch();

  const phoneCreate = useSelector((state) => state.phoneCreate);
  const { loading, error, phone } = phoneCreate;

  console.log(phone);

  const resetHandler = () => {
    setBrand("");
    setModel("");
    setPrice("");
    setOpsys("");
    setPic(
      "https://icon-library.com/images/icon-for-mobile/icon-for-mobile-12.jpg"
    );
    setPicMessage(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!brand || !model || !price || !opsys || !pic) return;
    dispatch(createPhoneAction(brand, price, model, opsys, pic));

    resetHandler();
    history.push("/myphones");
  };

  useEffect(() => {}, []);

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "phoneshop");
      data.append("cloud_name", "cagri");
      fetch("https://api.cloudinary.com/v1_1/cagri/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <MainScreen title="Create a Phone">
      <Card>
        <Card.Header>Create a new Phone</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="brand"
                value={brand}
                placeholder="Enter the brand"
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="model"
                value={model}
                placeholder="Enter the model"
                onChange={(e) => setModel(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="price"
                value={price}
                placeholder="Enter the price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="opsys">
              <Form.Label>Operating System</Form.Label>
              <Form.Control
                type="opsys"
                value={opsys}
                placeholder="Enter the Operating System"
                onChange={(e) => setOpsys(e.target.value)}
              />
            </Form.Group>
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="pic">
              <Form.Label>Phone Picture</Form.Label>
              <Form.File
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="image/png"
                label="Upload Phone Picture"
                custom
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="warning">
              Create Phone
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreatePhone;
