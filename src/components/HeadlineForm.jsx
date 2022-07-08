import styled from "styled-components";

const TitleH2 = styled.h2`
    text-align: center;
    margin-top: 10px;
`;

const TitleH5 = styled.h5`
    text-align: right;
    margin-top: 10px;
    margin-bottom: 20px;
`;


const HeadlineForm = ({ checkListInfo }) => {

    return (
        <>
            <TitleH2>{checkListInfo.name}</TitleH2>
            <TitleH2>施工抽查照片({checkListInfo.date})</TitleH2>
            <TitleH5>睿泰:{checkListInfo.RtName}、BES:{checkListInfo.BesName}</TitleH5>
        </>
    )
}

export default HeadlineForm;