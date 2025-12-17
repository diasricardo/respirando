import React, { useState } from 'react';
import { 
    View, Text, TouchableOpacity, StyleSheet, 
    Image, Modal, Platform, StatusBar, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from './Banner';

// Helper para detectar dispositivo com notch/barra de gestos
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Ícone de Informação do App
const InfoIcon = ({ onPress }) => (
    <TouchableOpacity style={styles.infoIcon} onPress={onPress}>
        <Text style={styles.infoIconText}>i</Text>
    </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTech, setSelectedTech] = useState(null);
    const developerName = "rick0Dev";
    const appVersion = "1.0.0";

    const techniques = [
        {
            id: 1,
            title: "Técnica 3-3-3",
            inspire: 3,
            hold: 3,
            expire: 3,
            description: "Ideal para acalmar rapidamente, reduzindo a frequência cardíaca em momentos de ansiedade."
        },
        {
            id: 2,
            title: "Técnica 4-7-8",
            inspire: 4,
            hold: 7,
            expire: 8,
            description: "Conhecida como 'tranquilizante natural', promove relaxamento profundo e ajuda na indução do sono."
        }
    ];

    const startBreathing = (config) => {
        navigation.navigate('Breathing', config);
    };

    const showTechInfo = (tech) => {
        setSelectedTech(tech);
        setIsModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'bottom', 'left']}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" translucent={false} />
            
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Respirando</Text>
                    <Text style={styles.headerSubtitle}>Controle emocional através da respiração</Text>
                </View>
                <InfoIcon onPress={() => {
                    setSelectedTech(null);
                    setIsModalVisible(true);
                }} />
            </View>

            {/* Conteúdo Principal */}
            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.circle}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.welcomeText}>
                        Selecione uma técnica
                    </Text>
                </View>

                {/* Técnicas */}
                <View style={styles.techniquesContainer}>
                    {techniques.map((tech) => (
                        <TouchableOpacity 
                            key={tech.id} 
                            style={styles.techCard}
                            onPress={() => startBreathing({
                                inspire: tech.inspire,
                                hold: tech.hold,
                                expire: tech.expire,
                                title: tech.title
                            })}
                        >
                            <View style={styles.techMain}>
                                <Text style={styles.techTitle}>{tech.title}</Text>
                                <View style={styles.techTiming}>
                                    <View style={styles.timingItem}>
                                        <Text style={styles.timingLabel}>Inspire</Text>
                                        <Text style={styles.timingValue}>{tech.inspire}s</Text>
                                    </View>
                                    <View style={styles.separator} />
                                    <View style={styles.timingItem}>
                                        <Text style={styles.timingLabel}>Segure</Text>
                                        <Text style={styles.timingValue}>{tech.hold}s</Text>
                                    </View>
                                    <View style={styles.separator} />
                                    <View style={styles.timingItem}>
                                        <Text style={styles.timingLabel}>Expire</Text>
                                        <Text style={styles.timingValue}>{tech.expire}s</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={styles.techActions}>
                                <TouchableOpacity 
                                    style={styles.techInfoBtn}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        showTechInfo(tech);
                                    }}
                                >
                                    <Text style={styles.techInfoBtnText}>Info</Text>
                                </TouchableOpacity>
                                
                                <View style={styles.startButton}>
                                    <Text style={styles.startButtonText}>▶</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Spacer dinâmico baseado na plataforma */}
                <View style={styles.bottomSpacer} />
            </View>

            {/* BANNER CORRIGIDO */}
            <View style={styles.bannerSection}>
                <Banner />
            </View>

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            {selectedTech ? selectedTech.title : "Sobre o Respirando"}
                        </Text>
                        
                        <Text style={styles.modalBody}>
                            {selectedTech 
                                ? selectedTech.description
                                : `Este aplicativo é sua ferramenta para o controle emocional e alívio da ansiedade.

Utilizando técnicas guiadas de respiração, você aprende a controlar o seu sistema nervoso, ativando a resposta de relaxamento e reduzindo imediatamente o estresse.

Use-o como uma âncora rápida para quebrar ciclos de pensamentos acelerados ou para auxiliar na indução do sono.`
                            }
                        </Text>
                        
                        {!selectedTech && (
                            <>
                                <View style={styles.modalInfoGroup}>
                                    <Text style={styles.modalInfoLabel}>Desenvolvedor:</Text>
                                    <Text style={styles.modalInfoValue}>{developerName}</Text>
                                </View>
                                
                                <View style={styles.modalInfoGroup}>
                                    <Text style={styles.modalInfoLabel}>Versão:</Text>
                                    <Text style={styles.modalInfoValue}>{appVersion}</Text>
                                </View>
                            </>
                        )}

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
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 10 : 15,
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#00BCD4',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#4A6572',
        marginTop: 2,
        opacity: 0.8,
    },
    
    // Conteúdo Principal
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 5,
    },
    
    // Logo Container
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF', 
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#48CFE0',
        marginBottom: 10,
    },
    logo: {
        width: 140,
        height: 140,
    },
    welcomeText: {
        fontSize: 16,
        color: '#4A6572',
        textAlign: 'center',
    },
    
    // Técnicas
    techniquesContainer: {
        width: '100%',
        flex: 1,
    },
    techCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0F7FA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    techMain: {
        flex: 1,
        marginRight: 12,
    },
    techTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#006064',
        marginBottom: 8,
    },
    techTiming: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timingItem: {
        alignItems: 'center',
        minWidth: 50,
    },
    timingLabel: {
        fontSize: 11,
        color: '#4A6572',
        marginBottom: 2,
    },
    timingValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#00BCD4',
    },
    separator: {
        width: 1,
        height: 20,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 8,
    },
    
    // Ações do Card
    techActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    techInfoBtn: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#E0F7FA',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#48CFE0',
        marginRight: 10,
    },
    techInfoBtnText: {
        color: '#0097A7',
        fontSize: 13,
        fontWeight: '500',
    },
    startButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#00BCD4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    
    // Ícone Info
    infoIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0F7FA',
        borderWidth: 1,
        borderColor: '#48CFE0',
    },
    infoIconText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00BCD4',
    },
    
    // Spacer dinâmico
    bottomSpacer: {
        height: Platform.OS === 'ios' ? 20 : 30,
    },
    
    // BANNER SECTION - CORRIGIDO
    bannerSection: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 12,
        paddingBottom: Platform.OS === 'android' ? 16 : 12,
        paddingHorizontal: 12,
        minHeight: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    // Modal
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
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00BCD4',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalBody: {
        textAlign: 'justify',
        fontSize: 15,
        color: '#4A6572',
        marginBottom: 20,
        lineHeight: 22,
    },
    modalInfoGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 6,
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
        padding: 12,
        marginTop: 15,
        minWidth: 120,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});