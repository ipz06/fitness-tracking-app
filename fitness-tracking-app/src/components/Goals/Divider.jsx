import PropTypes from "prop-types";

const DividerHeader = ({ heading }) => {
  return (
    <div
      style={{
        textAlign: "center",
        borderBottom: "1px solid #CCCCCC",
        marginBottom: "10px",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          top: "11px",
          display: "inline-block",
          color: "#6D717A",
          background: "#FFFFFF",
          padding: "0 10px",
          position: "relative",
          textTransform: "upper-case",
        }}
      >
        <span>{heading.toUpperCase()}</span>
      </h2>
    </div>
  );
};

export default DividerHeader;

DividerHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};
