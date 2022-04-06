import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import BlockchainContext from "../context/BlockChainContext";
import globalContext from "../context/GlobalContext";

import MyTimeLine from "react-timeline-vertical-component";
import GetInfoFromAadhar from "components/AadharApi.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/ExamplesNavbar.js";

function Timeline(props) {
  const { web3, accounts, contract } = useContext(BlockchainContext);
  const { SET_USER } = useContext(globalContext);

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const history = useHistory();
  const [adhar_in, setAdhar_in] = React.useState("4597 5546 4659");
  const [bldid_in, setBldid_in] = React.useState("00a41088");
  const [show, setShow] = React.useState(false);
  const [timelineData, setTimelineData] = React.useState([]);

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const toggleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (adhar_in.trim() !== "" && bldid_in.trim() !== "") {
      let temp_adhar = adhar_in.trim().toLowerCase().replaceAll(" ", "");
      let temp_bldid = bldid_in.trim().toLowerCase();

      try {
        var b_count = await contract.methods.getBloodCount().call();
        console.log("Finding blood");
        let temp_tl = [];
        for (let i = 1; i <= b_count; ++i) {
          const tag = await contract.methods.getBlood(i).call();

          if (
            tag["0"].trim().toLowerCase() === temp_bldid &&
            tag["2"].trim().toLowerCase().replaceAll(" ", "") === temp_adhar
          ) {
            console.log("tag", tag);
            const tag1 = await contract.methods.getBlood2(i).call();
            for (let j = 1; j <= tag1["1"]; j++) {
              const tag2 = await contract.methods.getStatus(i, j).call();
              let a = new Date(1000 * tag2["0"]);
              let b = GetInfoFromAadhar(adhar_in.trim())["Name"];
              let c =
                tag2["3"] === "0"
                  ? "Not Verified"
                  : tag2["3"] === "1"
                  ? "Tested and Safe"
                  : "Tested and Unsafe";
              if (j % 2) {
                var d =
                  "𝗡𝗮𝗺𝗲 : " +
                  b +
                  ". " +
                  "⠀".repeat(2) +
                  "\n𝗕𝗮𝘁𝗰𝗵 𝗡𝗼 : " +
                  tag["1"] +
                  ". " +
                  "⠀".repeat(10) +
                  " 𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗖𝗼𝗿𝗱 : " +
                  tag2["1"] +
                  ". " +
                  "𝗦𝘁𝗮𝘁𝘂𝘀 : " +
                  c;
              } else {
                var d =
                  "𝗡𝗮𝗺𝗲 : " +
                  b +
                  ". " +
                  "⠀".repeat(12) +
                  "\n𝗕𝗮𝘁𝗰𝗵 𝗡𝗼 : " +
                  tag["1"] +
                  ". " +
                  " 𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗖𝗼𝗿𝗱 : " +
                  tag2["1"] +
                  ". " +
                  "𝗦𝘁𝗮𝘁𝘂𝘀 : " +
                  c;
              }
              temp_tl.push({
                text: d,
                //  40+
                // tag2["2"] +
                // ,
                date:
                  a
                    .toLocaleString("en-GB")
                    .split(" ")[0]
                    .replaceAll("/", " / ")
                    .substring(0, 14) +
                  " at " +
                  a.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }),
                linkTitle: "Blood at " + tag2["2"],
              });
            }
            setTimelineData(temp_tl);
            toggleShow();
            console.log("temp_tl", temp_tl);
            break;
          }
        }
        if (temp_tl.length === 0) {
          alert(`${"No Data Found"}`);
        }
      } catch (err) {
        console.log("Error in getting blood", err);
        alert(`${"Enter Valid credentials"}`);
      }
    } else {
      alert(`${"Enter Valid credentials"}`);
    }
  };

  return (
    <>
      <ExamplesNavbar urlname="login" />
      <div className="wrapper">
        <div
          className="page-header clear-filter"
          filter-color="blue"
          hidden={show}
        >
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" + require("assets/img/bg4.jpeg").default + ")",
            }}
          ></div>
          <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" md="4">
                <Card className="card-login card-plain">
                  <Form action="" className="form" method="">
                    <CardHeader className="text-center">
                      <div className="logo-container">
                        <img
                          alt="..."
                          src={require("assets/img/now-logo.png").default}
                        ></img>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Aadhar Number  ..."
                          type="text"
                          value={adhar_in}
                          onChange={(event) => setAdhar_in(event.target.value)}
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Blood Id ..."
                          type="text"
                          value={bldid_in}
                          onChange={(event) => setBldid_in(event.target.value)}
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                        ></Input>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        onClick={formSubmit}
                      >
                        Track History
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Container>
          </div>
        </div>
      </div>
      {timelineData && (
        <div
          hidden={!show}
          // onClick={toggleShow}
          className="page-header-image pt-5 pb-5 justify-content-center"
          style={{
            color: "black",
            backgroundImage:
              "url(" + require("assets/img/bg4.jpeg").default + ")",
          }}
        >
          <MyTimeLine timelineData={timelineData} />
          <div className="row align-items-center justify-content-center">
            <Button className="btn-round" color="info" onClick={toggleShow}>
              Track for another Blood ID
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Timeline;
