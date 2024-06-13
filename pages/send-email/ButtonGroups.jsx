import { Box, ButtonGroup, Divider, IconButton } from "@mui/material";
import React from "react";
import {
  Delete,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatTextdirectionLToROutlined,
  FormatTextdirectionRToLOutlined,
  FormatUnderlined,
  Link,
} from "@mui/icons-material";

const ButtonGroups = ({ setAlignment, setDirection, setStyle, setText }) => {
  const handleBold = () =>
    setStyle((prev) => ({
      ...prev,
      fontWeight: prev.fontWeight === "bold" ? "normal" : "bold",
    }));
  const handleItalic = () =>
    setStyle((prev) => ({
      ...prev,
      fontStyle: prev.fontStyle === "italic" ? "normal" : "italic",
    }));
  const handleUnderline = () =>
    setStyle((prev) => ({
      ...prev,
      textDecoration:
        prev.textDecoration === "underline" ? "none" : "underline",
    }));
  const handleAlignment = (align) => setAlignment(align);
  const handleDirection = (dir) => setDirection(dir);
  const handleClearText = () => setText("");
  const handleLink = () =>
    setStyle((prev) => ({
      ...prev,
      textDecoration:
        prev.textDecoration === "underline" ? "none" : "underline",
      color: prev.color === "blue" ? "inherit" : "blue",
    }));
  const buttonGroups = [
    {
      label: "text formatting",
      buttons: [
        { icon: <FormatBold />, onClick: handleBold },
        { icon: <FormatItalic />, onClick: handleItalic },
        { icon: <FormatUnderlined />, onClick: handleUnderline },
      ],
    },
    {
      label: "alignment",
      buttons: [
        { icon: <FormatAlignLeft />, onClick: () => handleAlignment("left") },
        {
          icon: <FormatAlignCenter />,
          onClick: () => handleAlignment("center"),
        },
        { icon: <FormatAlignRight />, onClick: () => handleAlignment("right") },
      ],
    },
    {
      label: "text direction",
      buttons: [
        {
          icon: <FormatTextdirectionLToROutlined />,
          onClick: () => handleDirection("ltr"),
        },
        {
          icon: <FormatTextdirectionRToLOutlined />,
          onClick: () => handleDirection("rtl"),
        },
      ],
    },
    {
      label: "lists",
      buttons: [
        { icon: <FormatListBulleted />, onClick: () => {} },
        { icon: <FormatListNumbered />, onClick: () => {} },
      ],
    },
    {
      label: "clear text",
      buttons: [{ icon: <Delete />, onClick: handleClearText }],
    },
    {
      label: "link text",
      buttons: [{ icon: <Link />, onClick: handleLink }],
    },
  ];

  return buttonGroups.map((group, index) => (
    <ButtonGroup
      key={index}
      variant="contained"
      aria-label={group.label}
      sx={{ mb: 1, bgcolor: "transparent", border: 1, borderColor: "#ddd" }}
    >
      {group.buttons.map((button, btnIndex) => (
        <React.Fragment key={btnIndex}>
          <IconButton onClick={button.onClick}>{button.icon}</IconButton>
          {btnIndex < group.buttons.length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </React.Fragment>
      ))}
    </ButtonGroup>
  ));
};

export default ButtonGroups;
