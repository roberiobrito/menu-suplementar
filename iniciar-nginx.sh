#/bin/sh
#
# Lê a variável de ambiente AMBIENTE, copia as configurações deste ambiente para pasta de destino informada no 1o. argumento
# e finalmente inicia o nginx 
#

DESTINO=$1
if [ -z "$DESTINO" ]
then
    echo "Pasta destino não informada!"
    exit 1
fi

if [ -z "$AMBIENTE" ]
then
    echo "Nenhum ambiente definido. Usando tes"
    AMBIENTE=tes 
fi

echo "Copiando $AMBIENTE.json para $DESTINO/ambiente.json"
cp "$DIR_ATUAL$AMBIENTE.json" "$DESTINO/ambiente.json"
if [ "$?" -ne "0" ]
then
    echo "Nenhuma configuração encontrada para o ambiente $AMBIENTE!!!"
    exit 2
fi

echo "Iniciando nginx"
nginx -g 'daemon off;'