import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Link,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import io from "socket.io-client"; 
import { routesGen } from "../../routes/routes";
const socket = io("/"); 

const HotRanking = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    socket.on("popular_movies_updates", (updatedData) => {
      const parsedData = JSON.parse(updatedData);
      setLinks(parsedData);
    });

    return () => {
      // Clean up the socket connection when the component is unmounted
      socket.disconnect();
    };
  }, []);

  const handleLinkClick = async (link) => {
        const mediaDetailLink = routesGen.mediaDetail("movie", link.movieId);
  };
  
  return (
    <>
      <Typography style={{ paddingLeft: "1.3rem" }} variant="h6">
        Fan Favorite Movies
      </Typography>
      <Table>
        <TableBody>
          {links.slice(0, 7).map((link, index) => (
            <TableRow key={index}>
              <TableCell style={{ textDecoration: "none" }}>
                <Link
                  component="a"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#eee",
                    },
                  }}
                  onClick={() => handleLinkClick(link)} 
                  key={index}>
                  <LocalFireDepartmentIcon
                    style={{ verticalAlign: "middle", marginRight: "0.5rem" }}
                  />
                  {link.mediaName}
                  <FavoriteBorderIcon
                    style={{ verticalAlign: "middle", marginLeft: "0.5rem" }}
                  />
                  {link.score}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HotRanking;
