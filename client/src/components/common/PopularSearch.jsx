import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import newsApi from "../../api/modules/news.api";
import { toast } from 'react-toastify';

const LinkTable = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const data = await newsApi.getNewsDetail();
        setLinks(data.response.articles.slice(7, 12)); //
      } catch (error) {
        toast.error(error.message);
      }
    };

    getLinks();
  }, []);

  return (
    <Table>
      <TableBody>
        {links.map((link, index) => (
          <TableRow key={index}>
            <TableCell style={{ textDecoration: 'none' }}>
              <Typography variant="body1">
                <Link
                  component="a"
                  href={link.url}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.2rem',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: '#eee',
                    },
                  }}
                >
                  <LocalFireDepartmentIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}>
                    {link.iconName}
                  </LocalFireDepartmentIcon>
                  {link.title}
                </Link>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LinkTable;
