import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhoneAction,
  updatePhoneAction,
} from "../../actions/phonesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function SinglePhone({ match, history }) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [opsys, setOpsys] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/icon-for-mobile/icon-for-mobile-12.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const phoneUpdate = useSelector((state) => state.phoneUpdate);
  const { loading, error } = phoneUpdate;

  const phoneDelete = useSelector((state) => state.phoneDelete);
  const { loading: loadingDelete, error: errorDelete } = phoneDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePhoneAction(id));
    }
    history.push("/myphones");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/phones/${match.params.id}`);

      setBrand(data.brand);
      setModel(data.model);
      setPrice(data.price);
      setOpsys(data.opsys);
      setPic(data.pic);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

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

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePhoneAction(match.params.id, brand, model, price, opsys, pic)
    );
    if (!brand || !model || !price || !opsys || !pic) return;

    resetHandler();
    history.push("/myphones");
  };
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
    <MainScreen brand="Edit Phone">
      <Card>
        <Card.Header>Edit your Phone</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="brand"
                placeholder="Enter the brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="model"
                placeholder="Enter the model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="price"
                placeholder="Enter the Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="opsys">
              <Form.Label>Operating System</Form.Label>
              <Form.Control
                type="opsys"
                placeholder="Enter the Operating System"
                value={opsys}
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
            <Button variant="warning" type="submit">
              Update Phone
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Phone
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SinglePhone;
