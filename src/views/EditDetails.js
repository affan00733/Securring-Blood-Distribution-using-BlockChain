import { useHistory } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import BlockchainContext from "../context/BlockChainContext";
import QRCode from "qrcode";
import { sha256 } from "js-sha256";
// reactstrap components
import {
  Button,
  CardHeader,
  CardFooter,
  CardTitle,
  Form,
  Badge,
  Container,
  Row,
  Col,
} from "reactstrap";
import ExamplesNavbar from "components/ExamplesNavbar.js";
import SendEmail from "components/SendEmail.js";
import globalContext from "../context/GlobalContext";

function EditDetails(props) {
  // const [collectionDateFocus, setCollectionDateFocus] = React.useState(false);
  // const [emailToSend, setEmailToSend] = React.useState("");
  const { web3, accounts, contract } = useContext(BlockchainContext);
  const { user } = useContext(globalContext);

  useEffect(() => {
    console.log("contract", contract);
    console.log("web3", web3);
    console.log("accounts", accounts);
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  console.log(props);

  const history = useHistory();

  const formSubmit = async (e, accepted) => {
    e.preventDefault();
    props.location.state.verified = accepted;
    if (true) {
      // alert(`${JSON.stringify(props.location.state)}`);
      // add to blockchain

      //defining email data for accepted = true
      console.log(props.location.state.id);
      var data;
      if (accepted) {
        // change verified to true and add changed data in blockchain
        try {
          console.log(
            props.location.state.id,
            props.location.state.currentBloodBank,
            1,
            user.location,
            props.location.state.currentBloodBank
          );
          await contract.methods
            .transferAsset(
              props.location.state.id,
              props.location.state.currentBloodBank,
              1,
              user.location,
              props.location.state.currentBloodBank
            )
            .send({ from: accounts[0] });
        } catch (err) {
          console.log("Error in Transfer function", err);
        }
        // ---------- Generating and downloading QR code
        console.log(
          "Generating QR code of",
          props.location.state.adharNo
            .replaceAll(" ", "")
            .concat(props.location.state.bloodId)
            .concat(props.location.state.batchNo)
        );
        try {
          const qrCodeURL = (
            await QRCode.toDataURL(
              sha256(
                props.location.state.adharNo
                  .replaceAll(" ", "")
                  .concat(props.location.state.bloodId)
                  .concat(props.location.state.batchNo)
              )
            )
          ).replace("image/png", "image/octet-stream");
          console.log(qrCodeURL);
          let aEl = document.createElement("a");
          aEl.href = qrCodeURL;
          aEl.download = props.location.state.name + "_QR_Code.png";
          document.body.appendChild(aEl);
          aEl.click();
          document.body.removeChild(aEl);
        } catch (error) {
          console.log(error);
        }
        // ----------

        data = {
          to_email: props.location.state.email,
          subject: `ACCEPTED: Regarding the blood you donated on ${props.location.state.collectionDate}`,
          blood_bank: props.location.state.currentBloodBank,
          body: `<html>Dear <b>${props.location.state.name}</b> ,<br></br>Thanks for being a proud <b>${props.location.state.bloodGroup}</b> donor. We appreciate your donation! Your contribution will help us change lives – literally! Someone who would have lost their life was spared because you gave us your blood. Someone’s quality of life was improved because you gave us your blood. We were able to help many because you gave us your blood. That’s pretty remarkable, and so are you. Thank you!</html>`,
        };
        // Code to send email
        SendEmail(data);

        history.push({
          pathname: "/bloodbankhome",
          state: {
            card_id_to_be_changed: props.location.state.cardId,
            value: 1,
            entireData: props.location.state.entireData,
            countdict: props.location.state.countdict,
          },
        });
      } else {
        try {
          await contract.methods
            .transferAsset(
              props.location.state.id,
              props.location.state.currentBloodBank,
              2,
              user.location, // Enter real blood bank location instead of this values
              props.location.state.currentBloodBank
            )
            .send({ from: accounts[0] });
        } catch (err) {
          console.log("Error in Transfer function", err);
        }
        data = {
          to_email: props.location.state.email,
          subject: `NOT ACCEPTED: Regarding the blood you donated on ${props.location.state.collectionDate}`,
          blood_bank: props.location.state.currentBloodBank,
          body: `<html>Dear <b>${props.location.state.name}</b>,<br></br>We appreciate that you took an initiative to donate blood, but we regret to inform you that, according to the post-test statistics of the <b>${props.location.state.bloodGroup}</b> blood which we recieved, it was found that the blood is unsafe and hence could not make it any further. It may be because of system flaws but it would be great if you get a health checkup as soon as possible, and get back to us if you think the problem is at our side.</html>`,
        };
        // Code to send email
        SendEmail(data);
        history.push({
          pathname: "/bloodbankhome",
          state: {
            card_id_to_be_changed: props.location.state.cardId,
            value: 2,
            entireData: props.location.state.entireData,
            countdict: props.location.state.countdict,
          },
        });
      }
    } else {
      alert(`${"Enter Valid credentials"}`);
    }
  };

  return (
    <>
      <ExamplesNavbar urlname="bbhome" />
      <div className="wrapper">
        <div className="main">
          <>
            <div
              className="section section-signup"
              style={{
                backgroundImage:
                  "url(" + require("assets/img/bg4.jpeg").default + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                minHeight: "700px",
              }}
            >
              <Container>
                <Row>
                  <div
                    className="pt-3 px-0 ml-auto mr-auto shadow"
                    style={{
                      backgroundColor: "white",
                      borderBottomLeftRadius: "10px",
                      borderTopLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                      borderTopRightRadius: "10px",
                      maxWidth: "800px",
                      minWidth: "800px",
                    }}
                  >
                    <Form action="" className="form" method="">
                      <CardHeader className="text-center bg-white">
                        <CardTitle className="title-up text-info" tag="h3">
                          <small>Details for</small>
                          <br></br>
                          <b>{props.location.state.name}</b>
                        </CardTitle>
                      </CardHeader>
                      <div>
                        <Row>
                          <Col className="text-center ml-auto mr-auto">
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Email ID:</b>
                                {props.location.state.email}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Aadhar No: </b>
                                {props.location.state.adharNo}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Blood ID: </b>
                                {props.location.state.bloodId}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Batch No: </b>
                                {props.location.state.batchNo}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Collection Date: </b>
                                {props.location.state.collectionDate}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Expiry Date: </b>
                                {props.location.state.expiryDate}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Blood Group: </b>
                                {props.location.state.bloodGroup}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Age: </b>
                                {props.location.state.age}
                              </h4>
                            </div>
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Owner : </b>
                                {props.location.state.owner}
                              </h4>
                            </div>
                            {/* ******************************************************************** */}
                            <div>
                              <h4 class="card-title">
                                <b className="mr-4">Verification Status: </b>
                                {props.location.state.verified === "0" && (
                                  <Badge color="warning" className="py-1">
                                    Not yet Tested
                                  </Badge>
                                )}

                                {props.location.state.verified === "1" && (
                                  <Badge color="success" className="py-1">
                                    Tested {"&"} Safe
                                  </Badge>
                                )}

                                {props.location.state.verified === "2" && (
                                  <Badge color="danger" className="py-1">
                                    Tested {"&"} Unsafe
                                  </Badge>
                                )}
                              </h4>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div
                        className="p-3 text-justify"
                        style={{ opacity: "0.7" }}
                      >
                        <b className="mr-1">Note: </b>
                        {
                          "changing status to Tested and Safe will edit the contents of user and a mail will be sent to the user where as changing status to Tested and UnSafe will delete th user entry and also result in notifying the user through mail"
                        }
                      </div>
                      <CardFooter className="text-center pb-3">
                        <div className="row">
                          <Button
                            className="btn-round ml-auto mr-auto"
                            color="info"
                            size="lg"
                            onClick={(e) => {
                              formSubmit(e, true);
                            }}
                          >
                            Change status to Tested {"&"} Safe
                          </Button>

                          <Button
                            className="btn-round ml-auto mr-auto"
                            color="danger"
                            size="lg"
                            onClick={(e) => {
                              formSubmit(e, false);
                            }}
                          >
                            Change status to Tested {"&"} UnSafe
                          </Button>
                        </div>
                      </CardFooter>
                    </Form>
                  </div>
                </Row>
              </Container>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default EditDetails;
