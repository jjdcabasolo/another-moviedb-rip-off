// npm module imports: react, react-redux, PropTypes, moment
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

// mui native styling hook API
import { makeStyles } from "@material-ui/core/styles";
// mui component imports: rename materialUIComponent
import materialUIComponent from "@material-ui/core/materialUIComponent";
// custom icon, all made from scratch
import customIcon from "/assets/icons/customIcon";

// local component imports: rename localComponent, add proper path
import localComponent from "./path_to_component";

// api imports: rename apiName, add proper path
import apiName from "./path_to_api";

// redux ducks action imports
import { componentActions } from "../../../reducers/ducks";

// utils imports: replace functionUtil
import { functionUtil } from "../../../utils";

// constants imports: replace VARIABLE
import { VARIABLE } from "../../../constants";

// mui styling hook API usage
const useStyles = makeStyles((theme) => ({}));

// functional component declaration: rename FunctionalComponent
// props declaration
const FunctionalComponent = ({}) => {
  // theme variable usage variable declaration
  const theme = useTheme();

  // styling hook API variable declaration
  const classes = useStyles();

  // redux states declaration: rename component, replace variable
  const variable = useSelector((state) => state.component.variable);

  // redux actions usage
  const dispatch = useDispatch();

  // refs declaration: rename ref, replace value
  const ref = useRef(value);

  // react states declaration: rename state & setState, replace value
  const [state, setState] = useState(value);

  // side effects on state change (redux state change rerender, redux actions)
  useEffect(() => {}, []);

  // local variable declaration (conditions, state evaluations, switch cases)
  const variable = 1;

  // local component declaration (conditional renders, refactored redundant components)
  const Component = (children) => <>{children}</>;

  // component functions (state changes, onClick callbacks, event handling)
  const handleRowClick = () => {
    return 0;
  };

  // return block - component usage
  return <></>;
};

// PropTypes for props
FunctionalComponent.propTypes = {};

// default export
export default FunctionalComponent;
