import React, { useState, useContext, useEffect } from "react";
import BlockchainContext from "../context/BlockChainContext";
import globalContext from "../context/GlobalContext";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";

import { useHistory } from "react-router-dom";

// core components
import ExamplesNavbar from "components/ExamplesNavbar.js";
import ProfilePageHeader from "components/ProfilePageHeader.js";
import GetInfoFromAadhar from "components/AadharApi.js";

function BloodbankHome(props) {
  const [data, updateData] = useState();
  const [countdict, updateCountdict] = useState();
  var b_count = 0;

  const { web3, accounts, contract } = useContext(BlockchainContext);
  const { user } = useContext(globalContext);

  async function fetchData() {
    try {
      if (props && props.location.state) {
        console.log("from edit");
        console.log(props.location.state);
        // console.log(props.location.state.entireData);
        props.location.state.entireData[
          props.location.state.card_id_to_be_changed
        ]["verified"] = props.location.state.value.toString();

        // console.log(props.location.state.entireData);
        console.log(props.location.state.countdict);

        updateData(props.location.state.entireData);
        console.log("Data", data);
        updateCountdict(props.location.state.countdict);
        console.log("dict", countdict);
      } else {
        console.log("not from edit");
        try {
          console.log("inside try catch");
          console.log(user.name.toLowerCase().trim());
          const bloodData = [];
          b_count = await contract.methods.getBloodCount().call();
          var bloodcount = {
            "A +ve": 0,
            "A -ve": 0,
            "B +ve": 0,
            "B -ve": 0,
            "O +ve": 0,
            "O -ve": 0,
            "AB +ve": 0,
            "AB -ve": 0,
          };
          for (let i = 1; i <= b_count; i++) {
            const tag1 = await contract.methods.getBlood2(i).call();
            const tag2 = await contract.methods.getStatus(i, tag1["1"]).call();

            if (
              user.name.toLowerCase().trim() === tag2["2"].toLowerCase().trim()
            ) {
              const tag = await contract.methods.getBlood(i).call();

              //check if the blood belongs to the current blood bank and blood is not expired or not
              bloodcount[tag["4"]] = bloodcount[tag["4"]] + 1; //adding count of each blood to dict

              var temp = {
                id: i,
                bloodId: tag["0"],
                batchNo: tag["1"],
                // email: "",
                // name: "",
                adharNo: tag["2"],
                bloodGroup: tag["4"],
                verified: tag2["3"],
                owner: tag2["2"],
                collectionDate: new Date(1000 * tag2["0"])
                  .toLocaleString("en-GB")
                  .split(" ")[0]
                  .replaceAll("/", " / "),
                expiryDate: tag["5"].replaceAll("/", " / "),
              };
              bloodData.push(temp);
            }
          }
          bloodData.reverse();
          updateCountdict(bloodcount);
          updateData(bloodData);
          console.log("out of try catch");
        } catch (err) {
          console.log(err);
          console.log("Error in register!");
        }
      }
    } catch (e) {
      console.log("First Catch error", e);
    }
  }

  React.useEffect(() => {
    console.log("in ue");
    fetchData();
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

  const history = useHistory();

  const showDetails = (e, idx) => {
    e.preventDefault();
    history.push({
      pathname: "/editdetails",
      // search: "?query=abc",
      state: {
        id: data[idx]["id"],
        bloodId: data[idx]["bloodId"],
        batchNo: data[idx]["batchNo"],
        email: GetInfoFromAadhar(data[idx]["adharNo"])["Email"],
        name: GetInfoFromAadhar(data[idx]["adharNo"])["Name"],
        adharNo: data[idx]["adharNo"],
        bloodGroup: data[idx]["bloodGroup"],
        age: GetInfoFromAadhar(data[idx]["adharNo"])["Age"] + " Years",
        verified: data[idx]["verified"],
        collectionDate: data[idx]["collectionDate"],
        expiryDate: data[idx]["expiryDate"],
        owner: data[idx]["owner"],
        currentBloodBank: user.name,
        cardId: idx,
        entireData: data,
        countdict: countdict,
      },
    });
  };

  if (data && countdict) {
    return (
      <>
        <ExamplesNavbar urlname="bbhome" />
        <div className="wrapper">
          <ProfilePageHeader
            name={user.name.toUpperCase()}
            address={user.add}
            bloodcount={countdict}
            phone={user.no}
            email={user.email}
          />
          <div className="section">
            <Container>
              <div className="button-container row justify-content-center">
                <Button
                  className="btn-round"
                  color="info"
                  size="lg"
                  id="emailtooltip"
                >
                  {user.email}
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
                  {user.no}
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
                  {user.add}
                </Button>
                <UncontrolledTooltip delay={0} target="addresstooltip">
                  Visit us here
                </UncontrolledTooltip>
              </div>
              <Row class="container-fluid">
                <Col className="ml-auto mr-auto mb-4">
                  <h2 className="title text-center">Donation History</h2>
                </Col>
                <Col className="ml-auto mr-auto" md="10">
                  <Row className="collections">
                    <Row style={{ justifyContent: "space-between" }}>
                      {data.map((val, idx) => {
                        return (
                          <div key={idx}>
                            <div
                              class="card mt-1 border-5 active pb-0 px-2 shadow"
                              id="ta"
                            >
                              <div class="row ">
                                <div
                                  class=""
                                  style={{
                                    backgroundColor: "rgba(45,169,255,255)",
                                    borderBottomLeftRadius: "5px",
                                    borderTopLeftRadius: "5px",
                                    maxWidth: "6px",
                                    minWidth: "6px",
                                  }}
                                ></div>
                                <div class="col">
                                  <div class="pl-3">
                                    <h4 class="card-title">
                                      <b>Name : </b>
                                      {
                                        GetInfoFromAadhar(val["adharNo"])[
                                          "Name"
                                        ]
                                      }
                                    </h4>
                                    <span>
                                      <b>Date of Donation : </b>
                                      {val["collectionDate"]}
                                    </span>
                                    <br></br>
                                    <span>
                                      <b>Blood Id : </b>
                                      {val["bloodId"]}
                                    </span>
                                    <br></br>
                                    <span>
                                      <b>Batch No : </b>
                                      {val["batchNo"]}
                                    </span>
                                    <br></br>

                                    <span>
                                      <b>Blood Group : </b>
                                      <Badge
                                        color="primary"
                                        className="py-1"
                                        style={{ fontSize: "0.6rem" }}
                                      >
                                        {val["bloodGroup"]}
                                      </Badge>
                                    </span>

                                    {val["verified"] === "0" && (
                                      <span className="ml-3">
                                        <b>Verified : </b>
                                        <Badge
                                          color="warning"
                                          className="py-1"
                                          style={{ fontSize: "0.6rem" }}
                                        >
                                          Not Verified
                                        </Badge>
                                      </span>
                                    )}

                                    {val["verified"] === "1" && (
                                      <span className="ml-3">
                                        <b>Status : </b>
                                        <Badge
                                          color="success"
                                          className="py-1"
                                          style={{ fontSize: "0.6rem" }}
                                        >
                                          Tested {"&"} Safe
                                        </Badge>
                                      </span>
                                    )}

                                    {val["verified"] === "2" && (
                                      <span className="ml-3">
                                        <b>Status : </b>
                                        <Badge color="danger" className="py-1">
                                          Tested {"&"} Unsafe
                                        </Badge>
                                      </span>
                                    )}

                                    <Button
                                      color="info"
                                      className="px-3 py-2 my-4"
                                      style={{ width: "93%" }}
                                      onClick={(e) => {
                                        showDetails(e, idx);
                                      }}
                                    >
                                      <b>Edit Details</b>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Row>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="section" style={{}}>
        {/* <h5 class="card-title">
          <img
            src="https://i.stack.imgur.com/CzQqo.png"
            alt=""
            height="100%"
            width="100%"
          />
        </h5> */}
        <h5 style={{position : "absolute",bottom:-window.innerHeight*0.53,left:window.innerWidth*0.28}}>
          <img
            src="https://miro.medium.com/max/1400/1*ycWlcQ9BXQ1GhyE7qi_hLA.gif"
            alt=""
            height="100%"
            width="100%"
          />
          <h6 className="text-info" style={{fontWeight:"bolder" }}>{"⠀".repeat(25)}Loading . . . </h6>
        </h5>
      </div>
    );
  }
}

export default BloodbankHome;
