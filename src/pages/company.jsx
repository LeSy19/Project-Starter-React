import FormUser from "../components/company/company.form";
import CompanyTable from "../components/company/company.table";
import { fetchAllCompanyAPI } from '../services/api.services';
import { useEffect, useState } from 'react';

const CompanyPage = () => {
    const [dataCompanies, setDataCompanies] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadCompany();
    }, [page, size]);


    const loadCompany = async () => {
        const res = await fetchAllCompanyAPI(page, size);
        if (res.data) {
            setDataCompanies(res.data.result);
            setPage(res.data.meta.page);
            setSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }


    }


    return (
        <div style={{ padding: "20px" }}>
            <FormUser
                loadCompany={loadCompany}
            />
            <CompanyTable
                dataCompanies={dataCompanies}
                loadCompany={loadCompany}
                page={page}
                size={size}
                total={total}
                setPage={setPage}
                setSize={setSize}
            />
        </div>
    )
}


export default CompanyPage;