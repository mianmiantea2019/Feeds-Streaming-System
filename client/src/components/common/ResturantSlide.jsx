import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import resturantApi from "../../api/modules/resturant.api";
import { Box, Button, IconButton, Link, Stack } from "@mui/material";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {  TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from "react-highlight-words";

const ResturantSlide = () => {
  const [resturants, setResturants] = useState([]);
  // const [filteredResturants, setfilteredResturants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Step 1
  const articlesPerPage = 6;

  useEffect(() => {
    const getResturants = async () => {
      try {
        const data = await resturantApi.getResturantDetail();
        setResturants(data.response.businesses.slice(0, 15));
      } catch (error) {
        toast.error(error.message);
      }
    };

    getResturants();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => { // Step 2
    setSearchTerm(event.target.value);
    setCurrentPage(1)
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const filteredResturants = resturants.filter(resturant =>
    resturant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentArticles = filteredResturants.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <section>
      <Stack>
      <Grid container spacing={2} alignItems="center"> 
      <Grid item>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastArticle >= filteredResturants.length}
        >
          Next Page
        </Button>
      </Grid>
      <Grid item>
        <TextField
       InputProps={{
        endAdornment: <SearchIcon />, 
      }}
          type="text"
          placeholder="Search Restaurants..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Grid>
    </Grid>
        <Grid container spacing={3} style={{paddingTop:'1.0rem'}}>
          {currentArticles?.map((resturant, index) => (
            <Grid item xs={12} md={4} key={index}>
            <ResturantCard {...resturant} searchTerm={searchTerm} />
            </Grid>
          ))}
        </Grid>

      </Stack>
    </section>
  );
};

const ResturantCard = ({
  url,
  image_url,
  name,
  phone,
  location,
  price,
  rating,
  searchTerm,
}) => {
  const { display_address, city, state, zip_code } = location;

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}>
      <CardMedia
        component="img"
        alt={name}
        src={image_url}
        style={{
          height: "270px",
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      />
      <CardContent
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}>
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            marginBottom: "4px",
            textAlign: "center",
            color: "#1976D2",
          }}>
          <Highlighter
            highlightClassName="highlighted-text"
            searchWords={[searchTerm]}
            autoEscape={true}
            textToHighlight={name}
          />
        </Typography>
        <Typography
          variant="body2"
          style={{ marginBottom: "8px", textAlign: "center" }}>
          Price: {price} - Rating: {rating}
        </Typography>
        <Typography
          variant="body2"
          style={{ marginBottom: "8px", textAlign: "center" }}>
          {display_address[0]} {city}, {state} {zip_code}
        </Typography>
        <Link
          href={url}
          target="_blank"
          rel="noopener"
          style={{
            textDecoration: "none",
            color: "#1976D2",
            textAlign: "center",
          }}>
          Visit Website
        </Link>
      </CardContent>
    </Card>
  );
};

export default ResturantSlide;
