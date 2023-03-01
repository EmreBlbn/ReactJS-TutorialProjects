import styled from "styled-components";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Airtable = require('airtable');
const base = new Airtable(
    {apiKey: 'patAQiLDt6ApvVmFH.c9569923b72d6ca360cdcc503cc49504bea190f66f0aa5c13290f6807cb3b725'})
    .base('appx04aPv2fM0sc3A');

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 2;
  background-color: darkcyan;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  margin-top: 300px;
`;

const UserDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;
  padding: 15px;

  &:hover {
    background: lightgray;
  }
`;

const UserPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UsernameSpan = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
  margin-left: 35px;
  margin-top: 10px;
  justify-content: flex-end;
`;


export default function Login({selectUser}) {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        base('USERS').select({
            view: "Grid view",
            maxRecords: 6
        }).eachPage(function page(records, processNextPage) {
            setUsers(records)
            processNextPage();
        }, function done(error) {
            if (error) console.log(error);
        });
    }

    return (
        <LoginContainer>
            <LoginDiv>
                {users.map((user) => (
                    <UserDiv onClick={() => {
                        selectUser(parseInt(user.get('userId')));
                        navigate('/');
                    }}>
                        <UserPhoto src={user.get('profilePic')}/>
                        <UsernameSpan>{user.get('username')}</UsernameSpan>
                    </UserDiv>
                ))}

            </LoginDiv>
        </LoginContainer>

    );
}