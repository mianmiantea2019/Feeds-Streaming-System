import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import newsApi from "../../api/modules/news.api";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PopularSearch from "./PopularSearch";

const NewsSlide = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const articlesPerPage = 6;

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await newsApi.getTechNewsDetail();
        setArticles(data.response.articles);
      } catch (error) {}
    };

    getArticles();
  }, []);

  const loadMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight) {
      loadMoreData();
    }

    if (scrollTop > windowHeight) {
      setShowBackToTopButton(true);
    } else {
      setShowBackToTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentArticles = articles.slice(1, currentPage * articlesPerPage);
  const remainingArticles = articles.length - currentArticles.length - 1;
  return (
    <section>
      {articles.length > 0 ? (
        <Stack>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <NewsCard {...articles[0]} />
            </Grid>
            <Grid item md={4}>
              <PopularSearch />
            </Grid>
            {currentArticles.map((news, index) => (
              <Grid
                item
                key={index}
                style={{ display: "flex", alignItems: "center" }}>
                <PostList {...news} />
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}>
            <Button
              onClick={loadMoreData}
              disabled={remainingArticles === 0}
              style={{ marginRight: "20px" }}>
              Load More
            </Button>
            {showBackToTopButton && (
              <div
                style={{
                  position: 'fixed',   
                  bottom: '40px',      
                  zIndex: 9999,      
                  background: 'white', 
                  padding: '10px',    
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                }}>
                <Button onClick={scrollToTop}>Back To Top</Button>
              </div>
            )}
          </div>
        </Stack>
      ) : null}
    </section>
  );
};

function PostList({
  title,
  description,
  url,
  author,
  publishedAt,
  urlToImage,
}) {
  return (
    <Box style={{ width: "100%", margin: "0 auto" }}>
      <ListItem
        alignItems="flex-start"
        sx={{
          height: {
            xs: "auto", // Default height for small screens
            lg: "160px", // Height for medium and larger screens
          },
          boxSizing: "border-box",
        }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <img
                src={
                  urlToImage ||
                  "https://media4.s-nbcnews.com/j/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.nbcnews-fp-1024-512.png"
                }
                alt={author}
                style={{ width: "200px", maxHeight: "105px" }}
                onError={(e) =>
                  (e.target.src =
                    "https://media4.s-nbcnews.com/j/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.nbcnews-fp-1024-512.png")
                }
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="subtitle1" color="textSecondary">
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title=""
                  style={{ textDecoration: "none", fontSize: "1.2rem" }}>
                  {title}
                </Link>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <span
                  href="tech-category-01.html"
                  title={author}
                  style={{ textDecoration: "none" }}>
                  {author ? author : "Unknown Autor"}{" "}
                  <span>{publishedAt.slice(0, 10)}</span>
                </span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </ListItem>
    </Box>
  );
}

const NewsCard = ({
  title,
  description,
  url,
  urlToImage,
  author,
  publishedAt,
}) => {
  return (
    <Card style={{ outline: "none", boxShadow: "none" }}>
      <CardMedia
        component="img"
        alt={author}
        src={
          urlToImage ||
          "https://media4.s-nbcnews.com/j/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.nbcnews-fp-1024-512.png"
        }
        style={{ width: 902, height: 507, borderRadius: "15px" }}
      />
      <CardContent>
        <div>
          <Typography variant="subtitle1" color="textSecondary">
            <span
              href="tech-category-01.html"
              title={author}
              style={{ textDecoration: "none" }}>
              {author} <span>{publishedAt.slice(0, 10)}</span>
            </span>
          </Typography>
          <Typography variant="h5">
            <Link
              href={url}
              title=""
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}>
              {title}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSlide;
