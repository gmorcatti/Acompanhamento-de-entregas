import React, {useMemo} from "react";
import DataTable from 'react-data-table-component';

import "./styles.scss";

function PackagesTable() {

  const columns = React.useMemo(() => [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Director',
      selector: 'director',
      sortable: true,
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true,
    },
  ], []);

  return (
    <div id="PackagesTablePage">
      <DataTable
        title="Pacotes em transporte"
        columns={columns}
        data={[{
          title: 'Oi',
          director: 'Teste',
          year: '123'
        },{
          title: 'Oi',
          director: 'Teste',
          year: '123'
        }]}
      />
    </div>
  );
}

export default PackagesTable;
