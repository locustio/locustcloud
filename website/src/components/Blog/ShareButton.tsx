"use client";
import { MouseEvent, useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  Slide,
  SlideProps,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "components/Button";

interface IShareButton {
  text: string;
}

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="up" />
);

export default function ShareButton({ text }: IShareButton) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const open = Boolean(anchorEl);

  const url = typeof window === "undefined" ? "" : window.location.href;
  const encodedUrl = encodeURIComponent(
    "https://www.locust.cloud/blog/load-testing-gives-you-yes-no-answers-observability-tells-you-why/"
  );
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    x: `https://x.com/intent/post?text=${encodedText}${encodeURIComponent(` @locustio `)}${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleCloseSnackbar = () => setShowSuccess(false);
  const handleCloseShareMenu = () => setAnchorEl(null);

  const handleCopy = async () => {
    try {
      window.gtag("event", "button_click", {
        button_id: "blog-copy-link",
        button_text: `Copy Link`,
        page_path: location.pathname,
      });
      await navigator.clipboard.writeText(url);
      setShowSuccess(true);
      setAnchorEl(null);
    } catch {}
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.gtag("event", "button_click", {
      button_id: platform,
      button_text: `Share on ${platform}`,
      page_path: location.pathname,
    });
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
    handleCloseShareMenu();
  };

  return (
    <>
      <Button variant="cta" startIcon={<ShareIcon />} onClick={handleOpen}>
        Share
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseShareMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleCopy()}>
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleShare("x")}>
          <ListItemIcon>
            <XIcon />
          </ListItemIcon>
          <ListItemText>Share on X</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleShare("linkedin")}>
          <ListItemIcon>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText>Share on LinkedIn</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1200}
        onClose={handleCloseSnackbar}
        key={"slide-snackbar"}
        slots={{ transition: SlideTransition }}
      >
        <Alert severity="success" variant="filled">
          Copied to clipboard
        </Alert>
      </Snackbar>
    </>
  );
}
