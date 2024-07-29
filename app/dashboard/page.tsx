"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Checkbox } from "@mantine/core";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import useAuth from "../../hooks/useAuth";
import { StpRmforKlasik_2Endpoint } from "@/utils/endpoints";
import {
  DataItem,
  Item,
  StpRmforKlasik_2PayloadInterface,
} from "@/interfaces/interfaces";
import { generateChartData } from "@/utils/generateChart";
import { tableHeaders } from "@/utils/staticHeaders";
import { Text } from "@mantine/core";

const DashboardPage = () => {
  useAuth();

  const [data, setData] = useState<DataItem[]>([]);
  // const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchData = async () => {
    const StpRmforKlasik_2Payload: StpRmforKlasik_2PayloadInterface = {
      db_Id: 9,
      xRez_Sirket: 9,
      xBas_Tar: "2024-06-01",
      xBit_Tar: "2024-06-10",
      xtip: 1,
      kon1: "ALL",
      kon2: "BB",
      xchkFis_Fazla_otel_10: 0,
      bas_Yil: 2022,
      bit_Yil: 2022,
      fisrci_Kapalioda_10: 0,
      xRez_C_W: "C",
      xSistem_Tarihi: "2024-01-01",
      xAlis_Tarihi: "2024-01-01",
      sistem_Bas1: "2020-01-01",
      sistem_Bit1: "2029-01-01",
      pmdahil_10: 0,
      tip_1: "001",
      xFis_Bela_tutar_10: 0,
      trace_Dus_10: 0,
      cev_01: null,
    };

    if (token) {
      try {
        const response = await axios.post(
          StpRmforKlasik_2Endpoint,
          StpRmforKlasik_2Payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.value);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const renderTableRows = () => {
    return data.map((item: Item, index) => (
      <Table.Tr key={index}>
        <Table.Td ta="center" key="index">
          {index + 1}
        </Table.Td>
        {Array.isArray(tableHeaders) &&
          tableHeaders.slice(1).map((val, key) => {
            if (val == "Tarih") {
              item[val] = item[val].split("T")[0];
            }
            return (
              <Table.Td ta="center" key={key}>
                {item[val]}
              </Table.Td>
            );
          })}
      </Table.Tr>
    ));
  };

  return (
    <Container size="lg">
      <Text c="#4fb1f1" style={{ fontSize: "30px" }} mb="24" mt="24">
        RMOS HOTEL DATA ANALYZE TABLE
      </Text>
      <Table.ScrollContainer mb="24" minWidth={500}>
        <Table
          withTableBorder
          withColumnBorders
          striped
          highlightOnHover
          bd="1px solid #4fb1f1"
          horizontalSpacing="xl"
          align="center"
          mb="md"
        >
          <Table.Thead>
            <Table.Tr>
              {Array.isArray(tableHeaders) &&
                tableHeaders.map((val, key) => {
                  return (
                    <Table.Th c="white" bg="#4fb1f1" ta="center" key={key}>
                      {val}
                    </Table.Th>
                  );
                })}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{renderTableRows()}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Text c="#4fb1f1" style={{ fontSize: "30px" }} mb="24" mt="24">
        RMOS HOTEL DATA GRAPHICS
      </Text>
      <Bar data={generateChartData(data)} />
    </Container>
  );
};

export default DashboardPage;
