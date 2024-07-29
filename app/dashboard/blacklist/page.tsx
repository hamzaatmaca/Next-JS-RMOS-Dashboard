"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  TextInput,
  Group,
  Text,
} from "@mantine/core";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { Kara_Ekle, Kara_Getir } from "@/utils/endpoints";
import { BlacklistItem, KaraGetir } from "@/interfaces/interfaces";
import { addNewRegister, blackListTableHeader } from "@/utils/staticHeaders";

const BlackListPage = () => {
  useAuth();

  const [data, setData] = useState<BlacklistItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<BlacklistItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false); // Detail modal state
  const [newItem, setNewItem] = useState<Partial<BlacklistItem>>({});

  const payload: KaraGetir = {
    db_Id: 9,
    Adi: "ALL?",
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    axios
      .post(Kara_Getir, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data.value);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, [newItem]);

  const handleRowClick = (item: BlacklistItem) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const handleNewItemChange = (field: keyof BlacklistItem, value: string) => {
    const cleanField = field.trim();
    setNewItem((prev) => ({ ...prev, [cleanField]: value }));
  };

  const handleAddNewItem = () => {
    axios
      .post(Kara_Ekle, newItem, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData((prev) => [...prev, response.data]);
        setModalOpen(false);
        setNewItem({});
      })
      .catch((error) => {
        console.error("Yeni kayıt eklenirken hata oluştu:", error);
      });
  };

  return (
    <Container size="lg">
      <Text c="#4fb1f1" style={{ fontSize: "30px" }} mb="24" mt="24">
        BLACK LIST
      </Text>

      <Button mb={24} onClick={() => setModalOpen(true)}>
        Add New Member
      </Button>
      <Text c="red" style={{ fontSize: "20px" }} mb={20}>
        * Click rows for see details
      </Text>
      <Modal
        c="#4fb1f1"
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Member"
        centered
      >
        {addNewRegister.map((header, index) => (
          <TextInput
            key={index}
            label={index === 0 ? "enter db_Id default : 9" : header}
            onChange={(e) =>
              handleNewItemChange(header as keyof BlacklistItem, e.target.value)
            }
          />
        ))}
        <Group mt="md">
          <Button onClick={handleAddNewItem}>Add</Button>
        </Group>
      </Modal>
      <Table.ScrollContainer mb="24" minWidth={800}>
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
            <Table.Tr c="white" bg="#4fb1f1" ta="center">
              {blackListTableHeader.map((header, index) => (
                <Table.Th key={index}>{header}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item, key) => (
              <Table.Tr key={key} onClick={() => handleRowClick(item)}>
                {blackListTableHeader.map((header, index) => {
                  if (header == "Dogum_tarihi" || header == "Sistem_tarihi") {
                    item[header] = item[header]?.split("T")[0];
                  }
                  return (
                    <Table.Td key={index}>
                      {item[header as keyof BlacklistItem]}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {selectedItem && (
        <Modal
          mt={100}
          opened={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          centered
        >
          <Text size="lg" mb="md">
            <b>Detaylar</b>
          </Text>
          {blackListTableHeader.map((header, index) => (
            <p key={index}>
              <b>{header}</b>: {selectedItem[header as keyof BlacklistItem]}
            </p>
          ))}
        </Modal>
      )}
    </Container>
  );
};

export default BlackListPage;
