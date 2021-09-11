import React, { useEffect } from "react";
import {
  Accordion,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deletePhoneAction, listPhones } from "../../actions/phonesActions";

const MyPhones = ({ search }) => {
  const dispatch = useDispatch();
  const phoneList = useSelector((state) => state.phoneList);

  const { loading, phones, error } = phoneList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const phoneCreate = useSelector((state) => state.phoneCreate);
  const { success: successCreate } = phoneCreate;

  const phoneUpdate = useSelector((state) => state.phoneUpdate);
  const { success: successUpdate } = phoneUpdate;

  const phoneDelete = useSelector((state) => state.phoneDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = phoneDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePhoneAction(id));
    }
  };

  const history = useHistory();

  useEffect(() => {
    dispatch(listPhones());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Link to="createphone">
        <Button
          variant="warning"
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
        >
          Create New Phone
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      <div style={{ display: "flex" }}>
        {phones &&
          phones
            .filter((filteredPhone) => {
              return (filteredPhone.brand + " " + filteredPhone.model)
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .reverse()
            .map((phone) => (
              <Accordion key={phone._id}>
                <Card style={{ width: "18rem", margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Toggle
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                      >
                        {phone.brand + " " + phone.model}
                      </Accordion.Toggle>
                    </span>
                    <div>
                      <Button variant="warning" href={`/phone/${phone._id}`}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(phone._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Card.Img variant="top" src={phone.pic} />

                      <ListGroup
                        style={{ fontWeight: "bold" }}
                        className="list-group-flush"
                      >
                        <ListGroupItem>
                          Operating System:
                          <span style={{ fontWeight: "normal" }}>
                            {phone.opsys}
                          </span>
                        </ListGroupItem>
                        <ListGroupItem>
                          Price:
                          <span style={{ fontWeight: "normal" }}>
                            {phone.price}
                          </span>
                        </ListGroupItem>
                      </ListGroup>
                      <blockquote className="blockquote mb-0">
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {phone.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
      </div>
    </MainScreen>
  );
};

export default MyPhones;
