import React, { useState } from "react";
import Pdf from "react-to-pdf";

// reactstrap components
import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/ExamplesNavbar.js";
import ProfilePageHeader from "components/ProfilePageHeader.js";

const ref = React.createRef();

function Temp() {
  // const [pills, setPills] = React.useState("2");

  const [data, setData] = useState({
    selectedBloodGroup: "select",
    name: "",
  });

  const [hid, setHid] = useState(
    {
      den: false,
    },
    []
  );

  const [modal1, setModal1] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const search = (e) => {
    e.preventDefault();
    if (true) {
      console.log(`${JSON.stringify(data)}`);
      setData({
        bloodId: "BfdaBf",
        batchNo: "szfvdszfv",
        email: "raj.gorhekar@spit.ac.in",
        name: "Raj Gorhekar",
        adharNo: "4597 5546 4654",
        bloodGroup: "AB +ve",
        age: "20 years",
        verified: true,
        collectionDate: "9/18/2021",
        currentBloodBank: "Vijayee Blood Bank",
        currentPosition: "",
        timestamp: "9/18/2021, 4:13:10 PM",
        selectedBloodGroup: data.selectedBloodGroup,
      });

      setHid({ den: false });
      setModal1(true);
      // add to blockchain
    } else {
      alert(`${"Enter Valid credentials"}`);
    }
  };

  return (
    <>
      <ExamplesNavbar urlname="hhome" />
      <div className="wrapper">
        <ProfilePageHeader
          name={"Ankur Hospital  Multispeciality Hospital ".toUpperCase()}
          address="204, 2nd Floor Thakur Tower Raja Chatrapati Shivaji Marg, Gaothan Rd, Virar West, Mumbai, Maharashtra 401303"
          bloodcount={{}}
        />
        <div className="section">
          <Container>
            <div className="button-container row">
              <Button
                className="btn-round"
                color="info"
                size="lg"
                id="emailtooltip"
              >
                {"ankurhospital@gmail.com"}
              </Button>
              <UncontrolledTooltip delay={0} target="emailtooltip">
                Email us here
              </UncontrolledTooltip>
              <div className="mx-2"></div>
              <Button
                className="btn-round"
                color="info"
                size="lg"
                id="phonetooltip"
              >
                {"+91 8446417448"}
              </Button>
              <UncontrolledTooltip delay={0} target="phonetooltip">
                Call us here
              </UncontrolledTooltip>
              <div className="mx-2"></div>
              <Button
                className="btn-round"
                color="info"
                size="lg"
                id="addresstooltip"
              >
                {" Husaini Colony, Vasai West, Vasai-Virar, Maharashtra 401202"}
              </Button>
              <UncontrolledTooltip delay={0} target="addresstooltip">
                Visit us here
              </UncontrolledTooltip>
            </div>
            {/* <h3 className="title">About me</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </h5> */}

            <div className="section section-contact-us text-center">
              <Container>
                <h2 className="title">Ask for Blood</h2>
                <p className="description">
                  let us find an optimal blood bank for your patient
                </p>
                <Row>
                  <Col
                    className="text-center ml-auto mr-auto mt-4"
                    lg="6"
                    md="8"
                  >
                    <div
                      className="p-2"
                      style={{
                        borderBottomLeftRadius: "50px",
                        borderTopLeftRadius: "50px",
                        borderBottomRightRadius: "50px",
                        borderTopRightRadius: "50px",
                        borderStyle: "solid",
                        borderColor: " rgb(219, 219, 219)",
                        borderWidth: "1px",
                      }}
                    >
                      <label>
                        Blood Group of Patient :
                        <select
                          className="ml-5"
                          name="selectedBloodGroup"
                          value={data.selectedBloodGroup}
                          onChange={handleChange}
                        >
                          <option value="select">Select</option>
                          <option value="A +ve">A +ve</option>
                          <option value="A -ve">A -ve</option>
                          <option value="B +ve">B +ve</option>
                          <option value="B -ve">B -ve</option>
                          <option value="O +ve">O +ve</option>
                          <option value="O -ve">O -ve</option>
                          <option value="AB +ve">AB +ve</option>
                          <option value="AB -ve">AB -ve</option>
                        </select>
                      </label>
                    </div>
                    <div className="send-button">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        onClick={search}
                        size="lg"
                      >
                        Search for Blood
                      </Button>
                      <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                        <div className="modal-header justify-content-center pt-0">
                          <h4 className="title title-up">Blood Details</h4>
                        </div>
                        <ModalBody>
                          <p className="px-3 text-justify">
                            Following are the details of the blood you will
                            receive. please verify the hash once blood is
                            recieved
                          </p>

                          <div className="px-3 pt-2">
                            <div>
                              <h5 class="">
                                <b className="mr-4">Name:</b>
                                {data.name}
                              </h5>
                            </div>
                            {/* ******************************************************************** */}
                            <div>
                              <h5 class="card-title">
                                <b className="mr-4">Verification Status: </b>
                                {data.verified === false && (
                                  <Badge color="warning" className="py-1">
                                    Not yet Tested
                                  </Badge>
                                )}

                                {data.verified === true && (
                                  <Badge color="success" className="py-1">
                                    Tested {"&"} Safe
                                  </Badge>
                                )}
                              </h5>
                            </div>
                            <div>
                              <h5 class="card-title">
                                <b className="mr-4 ">
                                  <a
                                    target="1"
                                    href="http://maps.google.com/maps?q=19.031413,73.016422&ll=19.031413,73.016422&z=17"
                                  >
                                    See on Maps:{" "}
                                  </a>
                                </b>
                                <div className="row justify-content-center  mt-2">
                                  <iframe
                                    style={{ borderStyle: "solid" }}
                                    borderStyle="solid"
                                    title="maps"
                                    src="http://maps.google.com/maps?q=19.031413,73.016422&z=17&output=embed"
                                    height="300"
                                    width="420"
                                  ></iframe>
                                </div>
                              </h5>
                            </div>
                          </div>
                        </ModalBody>
                        <div className="modal-footer mb-3">
                          <Button
                            color="info"
                            type="button"
                            onClick={() => {
                              setModal1(false);
                              setHid({ den: true });
                            }}
                          >
                            Scan and Check
                          </Button>
                          <Button
                            color="primary"
                            type="button"
                            onClick={() => {
                              setModal1(false);
                              setHid({ den: true });
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Temp;
