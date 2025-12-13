import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from './Banner';

// Ícone de Informação (Componente Simples)
const InfoIcon = ({ onPress }) => (
    <TouchableOpacity style={styles.infoIcon} onPress={onPress}>
        <Text style={styles.infoIconText}>i</Text>
        {/* Se estiver usando Ionicons: <Ionicons name="information-circle-outline" size={30} color="#00BCD4" /> */}
    </TouchableOpacity>
);

// --- Componente Principal ---
export default function HomeScreen({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const startBreathing = (config) => {
        navigation.navigate('Breathing', config);
    };

    const developerName = "rick0Dev";
    const appVersion = "1.0.0";

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            
            {/* NOVO: Header Container para posicionar o ícone */}
            <View style={styles.header}>
                <InfoIcon onPress={() => setIsModalVisible(true)} />
            </View>
            
            <View style={styles.content}>

                {/* CÍRCULO COM LOGO FUNDO BRANCO */}
                <View style={styles.circle}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.subtitle}>Selecione a Técnica</Text>
                
                                {/* BOTÃO 3-3-3 */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => startBreathing({ inspire: 3, hold: 3, expire: 3 })}
                >
                    <Text style={styles.buttonText}>Técnica 3-3-3</Text>
                    <Text style={styles.buttonSmall}>Inspire 3s • Segure 3s • Expire 3s</Text>
                </TouchableOpacity>

                {/* BOTÃO 4-7-8 */}
                <TouchableOpacity
                    style={[styles.button, { marginTop: 12 } ]}
                    onPress={() => startBreathing({ inspire: 4, hold: 7, expire: 8 })}
                >
                    <Text style={styles.buttonText}>Técnica 4-7-8</Text>
                    <Text style={styles.buttonSmall}>Inspire 4s • Segure 7s • Expire 8s</Text>
                </TouchableOpacity>
            </View>

            {/* PUBLICIDADE */}
            <View style={styles.adContainer}>
                <View style={styles.adContent}>
                    <Banner />
                </View>
            </View>

            {/* --- MODAL SOBRE O APLICATIVO --- */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Sobre o Respirando</Text>
                        
                        <Text style={styles.modalBody}>
                            Este aplicativo é sua ferramenta para o controle emocional e alívio da ansiedade.

Utilizando técnicas guiadas de respiração (como 4-7-8 e 3-3-3), você aprende a controlar o seu sistema nervoso, ativando a resposta de relaxamento e reduzindo imediatamente o estresse.

Use-o como uma âncora rápida para quebrar ciclos de pensamentos acelerados ou para auxiliar na indução do sono.
                        </Text>
                        
                        <View style={styles.modalInfoGroup}>
                            <Text style={styles.modalInfoLabel}>Desenvolvedor:</Text>
                            <Text style={styles.modalInfoValue}>{developerName}</Text>
                        </View>
                        
                        <View style={styles.modalInfoGroup}>
                            <Text style={styles.modalInfoLabel}>Versão:</Text>
                            <Text style={styles.modalInfoValue}>{appVersion}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    },

    // --- NOVO ESTILO DO HEADER ---
    header: {
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
        // O padding vertical é gerenciado pelo SafeAreaView, mas reforçamos o horizontal
    },
    
    // --- ÍCONE DE INFORMAÇÃO ---
    infoIcon: {
        // Removida a posição absoluta e zIndex alto, agora está dentro do 'header'
        padding: 5,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0F7FA',
        borderWidth: 1,
        borderColor: '#48CFE0',
    },
    infoIconText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00BCD4',
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        // Ajustado para compensar a altura do header
        marginTop: -30, 
    },

    // Estilos do Círculo (Mantidos)
    circle: {
        width: 170,
        height: 170,
        borderRadius: 90,
        backgroundColor: '#FFFFFF', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        borderWidth: 4,
        borderColor: '#48CFE0',
        shadowColor: '#0097A7',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },

    logo: {
        width: 230,
        height: 230,
    },
    subtitle: {
        fontSize: 18,
        color: '#4A6572',
        marginBottom: 30,
    },

    // Estilos dos Botões (Mantidos)
    button: {
        backgroundColor: '#00BCD4',
        paddingVertical: 16,
        paddingHorizontal: 50,
        borderRadius: 18,
        width: '100%',
        maxWidth: 300,
        shadowColor: '#006064',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 4,
    },
    buttonSmall: {
        color: '#E0F7FA',
        fontSize: 12,
        textAlign: 'center',
        opacity: 0.9,
    },

    // Estilos da Publicidade (Mantidos)
    adContainer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#D0D0D0',
        padding: 16,
    },
    adLabel: {
        fontSize: 10,
        color: '#9E9E9E',
        textAlign: 'center',
        marginBottom: 8,
    },
    adContent: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
    },
    adText: {
        fontSize: 13,
        color: '#616161',
        textAlign: 'center',
    },

    // --- ESTILOS DO MODAL (Mantidos) ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00BCD4',
        marginBottom: 15,
    },
    modalBody: {
        textAlign: 'justify', // Comando adicionado/alterado
        fontSize: 16,
        color: '#4A6572',
        marginBottom: 20,
    },
    modalInfoGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 4,
    },
    modalInfoLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4A6572',
    },
    modalInfoValue: {
        fontSize: 14,
        color: '#00BCD4',
        fontWeight: '600',
    },
    modalButton: {
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        padding: 10,
        marginTop: 25,
        elevation: 2,
        minWidth: 100,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});