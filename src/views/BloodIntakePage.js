import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import BlockchainContext from "../context/BlockChainContext";
import globalContext from "../context/GlobalContext";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import ExamplesNavbar from "components/ExamplesNavbar.js";

function BloodIntake() {
  const [adharFocus, setAdharFocus] = React.useState(false);
  const [bloodIdFocus, setBloodIdFocus] = React.useState(false);
  const [batchNoFocus, setBatchNoFocus] = React.useState(false);
  // const [collectionDateFocus, setCollectionDateFocus] = React.useState(false);

  const { web3, accounts, contract } = useContext(BlockchainContext);
  const { user } = useContext(globalContext);

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        const tag = await contract.methods.getBlood(2).call();
        console.log("Fetched Blood", tag);

        const tag1 = await contract.methods.getBlood2(2).call();
        console.log("Fetched Blood more ", tag1);

        const tag2 = await contract.methods.getStatus(2, 1).call();
        console.log("Fetched latest Blood detils ", tag2);

        const Bloodcount = await contract.methods.getBloodCount().call();
        console.log("Blood count", Bloodcount);
      } catch (err) {
        console.log("Error in register!");
      }
    }

    fetchMyAPI();

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

  const history = useHistory();

  const [data, setData] = useState({
    bloodId: "",
    batchNo: "",
    // email: "",
    // name: "",
    adharNo: "",
    bloodGroup: "", // input lena h
    // age: "",
    verified: false,
    // collectionDate: new Date().toLocaleString().split(",")[0],
    currentPosition: user.name,
    location: "",
    timestamp: new Date().toLocaleString() + "",
  });

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (true) {
      try {
        await contract.methods
          .createAsset(
            data.bloodId,
            data.batchNo,
            data.adharNo,
            user.name,
            data.bloodGroup,
            new Date(Date.now() + 42 * 86400000)
              .toLocaleString("en-GB")
              .split(" ")[0],
              user.location,
          )
          .send({ from: accounts[0] });
      } catch (err) {
        console.log("Error in creation");
      }
      history.push("/bloodbankhome");
    } else {
      alert(`${"Enter Valid credentials"}`);
    }
  };

  const handleChange = (e) => {
    setData({
      bloodId: data.bloodId,
      batchNo: data.batchNo,
      email: data.email,
      name: data.name,
      adharNo: data.adharNo,
      bloodGroup: e.target.value,
      age: data.age,
      verified: false,
      collectionDate: new Date().toLocaleString().split(",")[0],
      currentBloodBank: "Vijayee Blood Bank",
      currentPosition: "",
      timestamp: new Date().toLocaleString() + "",
    });
  };

  const populate_data = async (e) => {
    var bg = [
      "A +ve",
      "A -ve",
      "B +ve",
      "B -ve",
      "O +ve",
      "O -ve",
      "AB +ve",
      "AB -ve",
    ];
    var bbs = [
      "Vijayee Blood Bank",
      "Prabodhan Blood Bank",
      "Ridhi sidhi Blood Bank",
      "Bloodline Blood Bank",
      "Samarpan Blood Centre",
    ];
    var locs = [
      "19.031413,73.016422",
      "19.159587,72.845633",
      "19.043413,73.015516",
      "19.200753,72.974882",
      "19.09339,72.913659",
    ];

    let guid = () => {
      var re = [];
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      re.push(s4() + s4());
      re.push(s4().toUpperCase());
      return re;
    };

    e.preventDefault();

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 10; j++) {
        try {
          await contract.methods
            .createAsset(
              guid()[0],
              guid()[1],
              "4597 5546 465" + j.toString(),
              bbs[i],
              bg[j % 8],
              new Date(Date.now() + 42 * 86400000)
                .toLocaleString("en-GB")
                .split(" ")[0],
              locs[i]
            )
            .send({ from: accounts[0] });

          var temp45 = await contract.methods.getBloodCount().call();
          console.log(temp45);
        } catch (err) {
          console.log("Error in creation");
        }
      }
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
                  <Card
                    className="py-5 px-0 ml-auto mr-auto"
                    style={{
                      borderBottomLeftRadius: "10px",
                      borderTopLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                      borderTopRightRadius: "10px",
                      maxWidth: "800px",
                    }}
                  >
                    <Form action="" className="form" method="">
                      <CardHeader className="text-center">
                        <CardTitle className="title-up text-info" tag="h3">
                          Fill up the following Details
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div className="pb-4">
                          <hr />
                        </div>
                        <Row>
                          <Col
                            className="text-center ml-auto mr-auto"
                            lg="6"
                            md="8"
                          >
                            <InputGroup
                              className={
                                "input-lg" +
                                (bloodIdFocus ? " input-group-focus" : "")
                              }
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons objects_key-25"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="BloodId..."
                                type="text"
                                name="bloodId"
                                value={data.bloodId}
                                onChange={InputEvent}
                                onFocus={() => setBloodIdFocus(true)}
                                onBlur={() => setBloodIdFocus(false)}
                              ></Input>
                            </InputGroup>

                            <InputGroup
                              className={
                                "input-lg" +
                                (batchNoFocus ? " input-group-focus" : "")
                              }
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons files_box"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Batch No..."
                                type="text"
                                name="batchNo"
                                value={data.batchNo}
                                onChange={InputEvent}
                                onFocus={() => setBatchNoFocus(true)}
                                onBlur={() => setBatchNoFocus(false)}
                              ></Input>
                            </InputGroup>

                            <InputGroup
                              className={
                                "input-lg" +
                                (adharFocus ? " input-group-focus" : "")
                              }
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons business_badge"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Aadhar Number..."
                                type="text"
                                name="adharNo"
                                value={data.adharNo}
                                onChange={InputEvent}
                                onFocus={() => setAdharFocus(true)}
                                onBlur={() => setAdharFocus(false)}
                              ></Input>
                            </InputGroup>

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
                                Blood Group of Patient:
                                <select
                                  className="ml-5"
                                  value={data.bloodGroup}
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
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter className="text-center">
                        <Button
                          className="btn-round"
                          color="info"
                          size="lg"
                          onClick={formSubmit}
                          // onClick={populate_data}
                        >
                          Add Details
                        </Button>
                      </CardFooter>
                    </Form>
                  </Card>
                </Row>
              </Container>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default BloodIntake;
