PGDMP  -    0                |            payment-gateway    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    32813    payment-gateway    DATABASE     �   CREATE DATABASE "payment-gateway" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
 !   DROP DATABASE "payment-gateway";
                postgres    false            �            1259    32815    bank    TABLE       CREATE TABLE public.bank (
    bank_id integer NOT NULL,
    bank_name character varying(10),
    bank_saldo integer,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updateat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.bank;
       public         heap    postgres    false            �            1259    32814    bank_bank_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bank_bank_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.bank_bank_id_seq;
       public          postgres    false    216            �           0    0    bank_bank_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.bank_bank_id_seq OWNED BY public.bank.bank_id;
          public          postgres    false    215            �            1259    32838 	   transaksi    TABLE     S  CREATE TABLE public.transaksi (
    transaksi_id integer NOT NULL,
    transaksi_name character varying(50),
    transaksi_harga integer,
    transaksi_bank_id integer,
    transaksi_user_id integer,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updateat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.transaksi;
       public         heap    postgres    false            �            1259    32837    transaksi_transaksi_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transaksi_transaksi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.transaksi_transaksi_id_seq;
       public          postgres    false    220            �           0    0    transaksi_transaksi_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.transaksi_transaksi_id_seq OWNED BY public.transaksi.transaksi_id;
          public          postgres    false    219            �            1259    32824    users    TABLE     @  CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(20),
    password character varying(200),
    user_saldo integer,
    user_bank_id integer,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updateat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    32823    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    218            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    217            $           2604    32818    bank bank_id    DEFAULT     l   ALTER TABLE ONLY public.bank ALTER COLUMN bank_id SET DEFAULT nextval('public.bank_bank_id_seq'::regclass);
 ;   ALTER TABLE public.bank ALTER COLUMN bank_id DROP DEFAULT;
       public          postgres    false    215    216    216            *           2604    32841    transaksi transaksi_id    DEFAULT     �   ALTER TABLE ONLY public.transaksi ALTER COLUMN transaksi_id SET DEFAULT nextval('public.transaksi_transaksi_id_seq'::regclass);
 E   ALTER TABLE public.transaksi ALTER COLUMN transaksi_id DROP DEFAULT;
       public          postgres    false    220    219    220            '           2604    32827    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    32815    bank 
   TABLE DATA           S   COPY public.bank (bank_id, bank_name, bank_saldo, createdat, updateat) FROM stdin;
    public          postgres    false    216   !       �          0    32838 	   transaksi 
   TABLE DATA           �   COPY public.transaksi (transaksi_id, transaksi_name, transaksi_harga, transaksi_bank_id, transaksi_user_id, createdat, updateat) FROM stdin;
    public          postgres    false    220   O"       �          0    32824    users 
   TABLE DATA           k   COPY public.users (user_id, username, password, user_saldo, user_bank_id, createdat, updateat) FROM stdin;
    public          postgres    false    218   R#       �           0    0    bank_bank_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.bank_bank_id_seq', 8, true);
          public          postgres    false    215            �           0    0    transaksi_transaksi_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.transaksi_transaksi_id_seq', 11, true);
          public          postgres    false    219            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 13, true);
          public          postgres    false    217            .           2606    32822    bank bank_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.bank
    ADD CONSTRAINT bank_pkey PRIMARY KEY (bank_id);
 8   ALTER TABLE ONLY public.bank DROP CONSTRAINT bank_pkey;
       public            postgres    false    216            2           2606    32845    transaksi transaksi_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.transaksi
    ADD CONSTRAINT transaksi_pkey PRIMARY KEY (transaksi_id);
 B   ALTER TABLE ONLY public.transaksi DROP CONSTRAINT transaksi_pkey;
       public            postgres    false    220            0           2606    32831    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            4           2606    32846 *   transaksi transaksi_transaksi_bank_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaksi
    ADD CONSTRAINT transaksi_transaksi_bank_id_fkey FOREIGN KEY (transaksi_bank_id) REFERENCES public.bank(bank_id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.transaksi DROP CONSTRAINT transaksi_transaksi_bank_id_fkey;
       public          postgres    false    216    220    4654            5           2606    32851 *   transaksi transaksi_transaksi_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaksi
    ADD CONSTRAINT transaksi_transaksi_user_id_fkey FOREIGN KEY (transaksi_user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.transaksi DROP CONSTRAINT transaksi_transaksi_user_id_fkey;
       public          postgres    false    4656    218    220            3           2606    32832    users users_user_bank_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_bank_id_fkey FOREIGN KEY (user_bank_id) REFERENCES public.bank(bank_id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_bank_id_fkey;
       public          postgres    false    4654    218    216            �   �   x�}�;nBAEk{o���=�2T/IJ�44)�H4y�q{��l]��9��1 $uG��X�R)YU�	B��� ���-Ԓ8+��	B�q\��m�&Qa}Pa|��/���iV\�T&+�����8I;U��������E$��y�J>A�_�e#�Ԋ��������{�^���[��q��u��T�m�g`      �   �   x�}�[n1E��U�����d]?��Z*]CҌ�I���ڦ�s;^v���@�2�nP6dZe����s?<��پ����WN5Yt,��y�ҺɪZTS��A��l/*��H�i��4������-uX�=��?������SE�IQ�t�\�طga,��v� υ��h�������̅�y��)�v.tqU))J�B�A@����=���yX^�<`+ҚZ87f� �F � �%      �   ~  x�}�Ks�@�����"۴}�;A��G$+����hT$~�SV�@Q�_s��#��=|W �c�A	�w�݁�fX����Ԣ!zR)�Y����	L� �%��
3^�|���DY��4�*ߪJ�'��^��R+FL���I@�t|�6�\G۷y\����Q���J��Q=ooA�i��[Ղ���Z��][D`nR�P��<��E�~���p�9m�?t���0�?瞮����j=���DǓy�yOq�ǥuC��q�Q��fR� ���b�)"����L�� d�5�Pƅ�*�- L���������t]�q4�s�����7�a{ӕ"lȡ[�jo���?��^���U�% 3I�� �3V8���4�9_�u�D�ήm����nٸ�Is<�����I�#���l�Á�!¢��!�M�KR'��?�r�s�N{���S�O�c}���.`�l�ș�����f^G5�`�Z<�E��9n��%}����حiu������?���h"i��.�M���/���_�����jH��$���ПøD����So(��#�N���{/�d2�W��ir��ϟqd��C6���7_��y�_6�c�_w'��%� �B�B�     